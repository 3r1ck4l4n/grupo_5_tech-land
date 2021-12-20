let {Admin} = require('../../../DataBase/models');
const customersController = {
    adminsList: (req, res) => {
        Admin.findAll()
            .then(admins => {
                console.log(admins);
                let response = {
                    count: admins.length,
                    users: admins.filter(admin => {
                        delete admin.dataValues.admin_password;
                        delete admin.dataValues.admin_number_phone;
                        admin.dataValues.detail = `/api/admin/${admin.dataValues.admin_id}`;
                        return admin;
                    })
                }
                res.status(200).json(response);
            })
            .catch(error => res.send(error));
    },
    adminId: (req, res) => {
        let pk = req.params.id;
        
        Admin.findByPk(pk)
            .then(user =>{
                delete user.dataValues.admin_password;
                let admin = {
                    ...user.dataValues
                }
                
                res.status(200).json(admin);
            })
            .catch(error => res.send(error.json()));
        
    }
};

module.exports = customersController;