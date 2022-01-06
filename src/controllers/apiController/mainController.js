const db = require('../../DataBase/models');
const OrderDetail = db.Order_Detail;
const Product = db.Product;
const {Op} = require('sequelize');

const mainController = {
    home: (req, res) => {
        Promise.all([
                db.Product.findAll({
                    where: {
                        availability: {
                            [Op.eq]: true
                        }
                    },
                    include: [{
                        model: db.Category,
                        as: 'categories',
                        where: {
                            name_category: {
                                [Op.eq]: ['Destacados']
                            }
                        }
                    }]
                }),
                db.Product.findAll({
                    where: {
                        availability: {
                            [Op.eq]: true
                        }
                    },
                    include: [{
                        model: db.Category,
                        as: 'categories',
                        where: {
                            name_category: {
                                [Op.eq]: ['En oferta']
                            }
                        }
                    }]
                })
            ])
            .then(products => {
                let destacados = products[0];
                let enOferta = products[1];
                res.render('home', {destacados, enOferta});
            })
            .catch();
    },
    login: (req, res) => {
        res.render('login');
    },
    register: (req, res) => {
        res.render('register');
    },
    productCart: (req, res) => {
        OrderDetail.findAll({
            where:{
                customer_id: {
                    [Op.eq]: req.session.userLogged.customer_id
                }
            },
            include:[{
                model: db.Product,
            as: 'products'
        }
            ]
        })
            .then(response => {
                res.render("products/productCart",{response:response});
            });
    
    },
    addItemToCar: (req, res)=>{
        
        console.log("***********************"+req.session.userLogged.customer_id);
            console.log("ERROR")
        
        let idProduct = req.body.idProduct;
        console.log(idProduct);
        
        Product.findByPk(idProduct)
            .then(product=> {
                console.log(product);
                let detail ={
                    customer_id: req.session.userLogged.customer_id ,
                    product_id: parseInt(idProduct) ,
                    unity_price:  product.dataValues.price ,
                    quantity: parseInt(req.body.quantity),
                    total_price: product.dataValues.price *  req.body.quantity,
                };
                console.log(detail);
                OrderDetail.create(detail)
                    .then(detail=> {
                        console.log(detail)
                        res.redirect("/home")
                    })
                    .catch(error=> console.log(error));
            })
            .catch(error => console.log(error))
    }
};

module.exports = mainController;
