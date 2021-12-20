const {validationResult} = require('express-validator');
const User = require("../model/Users");
const path = require("path");
const hashPass = require('../middleware/hashing');

// connecting to DB

const db = require('../DataBase/models');
const Customer = db.Customer;

const userController = {
    register: (req, res)=>{        
        res.render(path.join(__dirname, '../views/users/register'));
    },
    createUser: async (req, res)=>{
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.mapped())
            return res.render('users/register',{
                errors:errors.mapped(),
                oldData:req.body
            });
        } else {
            // let userInDB = User.findByField('email', req.body.email);
            //if (userInDB) {
            //    return res.render('users/register', {
            //        errors: {
            //            email: {
            //                msg: "This email has been previously registered"
            //            }
            //        },
            //        oldData: req.body
            //    });
            //}

            //let user = {
            //    user: `${req.body.firstName} ${req.body.lastName}`,
            //    password: hashPass.hash(req.body.password),
            //    email: req.body.email,
            //    nationality: req.body.pais,
            //    profileImage: null
            //}
            //req.file ? (user.profileImage = `/profileImages/${req.file.filename}`) :
            //    (user.profileImage = "/profileImages/imagedefault.png");
            //User.create(user)
            //res.redirect("/users/login");


                let customerInDB = null;

                await Customer.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                .then(customer=>{    
                    console.log(customer.dataValues)            
                    customerInDB = customer.dataValues;                
                })
                .catch(error=>{
                   return console.log("un error tratando de encontrar el email en la base de datos");
                });


                if(customerInDB){
                    return res.render('users/register', {
                        errors: {
                            email: {
                                msg: "This email has been previously registered"
                            }
                        },
                        oldData: req.body
                    });
                } else {
                    let customer = {
                        full_name: `${req.body.firstName} ${req.body.lastName}`,
                        passwd: hashPass.hash(req.body.password),
                        email: req.body.email,
                        nationality: req.body.pais,
                        customer_number_phone: req.body.customer_number_phone,
                        address: req.body.address,
                        customer_profile_image: null
                    }
                    req.file ? (customer.customer_profile_image = `/profileImages/${req.file.filename}`) :
                        (customer.customer_profile_image = "/profileImages/imagedefault.png");
                    Customer.create(customer)
                        .then(customer=>{                 
                               console.log(customer);
                               return res.redirect("/users/login");                                       
                        })
                        .catch(error=>{
                            return console.log("un error tratando de guardar los datos en la base de datos");
                        });
                }

        }
    },

    login: (req, res)=>{
        res.render(path.join(__dirname, '../views/users/login'));
    }, 

    gettingLogged: async (req, res)=>{
        let errors = validationResult(req); 
        if(!errors.isEmpty()){
                res.render(path.join(__dirname, '../views/users/login'), {
                errors: errors.mapped(),
                oldData: req.body
            });
        } else {

            let customerToLogin = null;

            await Customer.findOne({
                where:{
                    email: req.body.email
                }
            })
            .then(customer=>{
                console.log(customer.dataValues);
                customerToLogin = customer.dataValues;
            })
            .catch(error=>{
                console.log("Un error tratando de encontrar el email en la db");
            });


            if(customerToLogin){ // Check if the email is registered
                let passwordIsCorrect = hashPass.compare(req.body.password, customerToLogin.passwd); //Check if the password is correct

                if(passwordIsCorrect){
                    delete customerToLogin.passwd;
                    req.session.userLogged = customerToLogin;
                
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


        }

        //let userToLogin = User.findByField('email', req.body.email); // Check if the user is in the DB
        /*        
        
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
        */
        

              

    },

    profile: (req, res)=>{
        res.render(path.join(__dirname, '../views/users/profile'), {
            user: req.session.userLogged
        });
    },

    logout: (req, res)=>{
        res.clearCookie('myEmail');    //delete cookie Validar si existe
        req.session.destroy(); // delete session
        return res.redirect('/home');
    }
}

module.exports = userController;