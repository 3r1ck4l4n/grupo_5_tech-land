let {Customer} = require('../../../DataBase/models');
const customersController = {
    customerList: (req, res) => {
        Customer.findAll()
            .then(customers => {
                  console.log(customers.da)
                let response = {
                    count: customers.length,
                    users: customers.filter(customer => {
                        delete customer.dataValues.passwd;
                        delete customer.dataValues.address;
                        delete customer.dataValues.nationality;
                        delete customer.dataValues.customer_number_phone;
                        customer.dataValues.detail = `/api/customer/${customer.dataValues.customer_id}`;
                        return customer;
                    })
                }
                res.status(200).json(response);
            })
            .catch(error => res.send(error));
    },
    customerId: (req, res) => {
        let pk = req.params.id;
        
        Customer.findByPk(pk)
            .then(user =>{
                delete user.dataValues.passwd;
                delete user.dataValues.address;
                let customer = {
                    ...user.dataValues
                }
                
                res.status(200).json(customer);
            })
            .catch(error => res.send(error.json()));
        
    }
};

module.exports = customersController;