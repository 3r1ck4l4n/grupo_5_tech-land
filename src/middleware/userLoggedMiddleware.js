//const User = require('../model/Users');
const db = require('../DataBase/models');
const userLoggedMiddleware = async (req, res, next)=>{
    res.locals.isLogged = false;

    //let myEmailinCookie = req.cookies.myEmail;
    //let userFromCookie = User.findByField('email', myEmailinCookie);
    
    let myEmailinCookie = null;
    if(req.cookies.myEmail !== undefined){
        console.log(req.cookies.myEmail);
        myEmailinCookie = req.cookies.myEmail;
    

    
            let userFromCookie = null;

            await db.Customer.findOne({
                where:{
                    email: myEmailinCookie
                }
            })
            .then(customer =>{
                userFromCookie = customer.dataValues;
            })
            .catch(error=>{
                res.send("Un error");
            })
        
                    if(userFromCookie.email === myEmailinCookie){
                        delete userFromCookie.passwd;
                        console.log(userFromCookie);
                        req.session.userLogged = userFromCookie;

                    }
                
    }

    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged =  req.session.userLogged
    } 

    next();

};


module.exports = userLoggedMiddleware;