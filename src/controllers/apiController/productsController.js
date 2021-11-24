let db = require('../../DataBase/models');
let{Op} = require('sequelize');
let productsController = {
    home: (req, res) => {
        let notFound = {
            error: "Product not found",
            state: 204
        }
        db.Product.findAll()
            .then(products => {
                res.render('products/products.ejs', {products: products});
            })
            .catch(error => {
                res.render(('products/products.ejs'), {error: notFound})
            });
    },
    productDetail: (req, res) => {
        console.log(req.params.id);
        let products =[];
        db.Product.findAll({
            include: [{
                as:'categories',
                model: db.Category,
                where: {
                    name_category: {
                        [Op.eq]: 'Destacados'
                    }
                }
            }],

        })
            .then(Products => {
                Products.forEach(p => {
                    delete p.dataValues.categories;
                    products.push(p.dataValues);
                    console.log(p.dataValues)
                    })
                })
            .catch(error=> products.push(error));

        db.Product.findAll({
            include: {
                model: 'categories',
                where: {
                    categories_id: 'Destacados'
                }
            }
        })
        db.Product.findByPk(req.params.id, {
            include: [{
                model:db.Review,
                as:'reviews',
                include:[{
                    model:db.Customer,
                    as:'customer'
                }]
            }]
        })
            .then(item => {
                res.render('products/productDetail.ejs', {
                    products: products,
                    item:item,
                    reviews: item.reviews
                });
                item.reviews.forEach(p=>{
                    console.log(p.dataValues)
                })
                //delete p.dataValues._previousDataValues;
                //p.dataValues.customer.dataValues
                //Obtener Datos del usuario

            })
            .catch()
    },
};

module.exports = productsController;
