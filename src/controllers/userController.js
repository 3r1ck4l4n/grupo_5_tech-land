const {validationResult} = require('express-validator');
const User = require("../model/Users");
const path = require("path");
const hashPass = require('../middleware/hashing');

const userController = {
    register: (req, res)=>{
        res.render(path.join(__dirname, '../views/users/register'));
    },
    createUser: (req, res)=>{
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send(errors.mapped());
        } else {
            let user = {
                user: `${req.body.firstName} ${req.body.lastName}`,
                password: hashPass.hash(req.body.password),
                email: req.body.email,
                nationality: req.body.pais,
                profileImage: null
            }
            req.file ? (user.profileImage = `/data/images/users/${req.file.filename}`) :
                (user.profileImage = "/data/images/users/imagedefault.png");
            User.create(user)
            res.send("Se guardo el usuario");
        }
    },

    login: (req, res)=>{
        res.render(path.join(__dirname, '../views/users/login'));
    }, 

    gettingLogged: (req, res)=>{
        let errors = validationResult(req);
        if(!errors.isEmpty()){
                res.render(path.join(__dirname, '../views/users/login'), {
                errors: errors.mapped(),
                oldData: req.body
            });
        } 

        let userToLogin = User.findByField('email', req.body.email); // Check if the user is in the DB
        
        if(userToLogin){
            let passwordIsCorrect = hashPass.compare(req.body.password, userToLogin.password); //Check if the password is correct
            
            if(passwordIsCorrect){
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
               
                if(req.body.rememberMe){
                    res.cookie('myEmail', req.body.email, {maxAge: (1000* 60) * 2});                    
                }
                
                return res.redirect('profile');                
                
            }            

            return res.render(path.join(__dirname, '../views/users/login'), { // If password is wrong, then it sends an error.
                errors: {
                    email: {
                        msg: "Tu email o contraseña son incorrectos"
                    }
                },
               oldData : req.body
            });
            
        } 
        return res.render(path.join(__dirname, '../views/users/login'), { // If user is not in the DB, then it sends an error.
            errors:{
                email: {
                    msg: 'Este email no está registrado. Por favor, veríficalo o regístrate para poder iniciar sesión'
                }
            },
           oldData : req.body
        });

    },

    profile: (req, res)=>{
        res.render(path.join(__dirname, '../views/users/profile'), {
            user: req.session.userLogged
        });
    },

    logout: (req, res)=>{
        res.clearCookie('myEmail');    //delete cookie
        req.session.destroy(); // delete session
        return res.redirect('/home');
       
        
    }
}

module.exports = userController;