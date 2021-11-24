const db = require('./DataBase/models');
const sequelize = db.sequelize;
const {Op} = require('sequelize')
const Order_Detail = db.Order_Detail;

const Product = db.Product;
const Category = db.Category
const Review = db.Review;
let recoommend = [];
const test = () => {
    Product.findAll( {
        include: [{
            model: Category,
            as: 'categories',
            where: {
                name_category: {
                    [Op.eq]: 'Destacados'
                }
            }
        }, {
            model: Review,
            as: 'reviews',
            include: ['customer']
        }],
    })
        .then(Products => {
            Products.forEach(p=>{
                console.log(p.dataValues)
            })


        })
        .catch("Connection not foound");
}

test();
