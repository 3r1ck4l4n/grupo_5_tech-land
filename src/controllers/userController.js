
const path = require("path");

const userController = {
    register: (req, res)=>{
        res.render(path.join(__dirname, '../views/users/register'));
    },

    login: (req, res)=>{
        res.render(path.join(__dirname, '../views/users/login'));
    }
}

module.exports = userController;