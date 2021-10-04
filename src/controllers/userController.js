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
    }
}

module.exports = userController;