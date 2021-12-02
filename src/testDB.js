const db = require('./DataBase/models');
const sequelize = db.sequelize;
const {Op} = require('sequelize')
const Order_Detail = db.Order_Detail;

const Product = db.Product;
const Category = db.Category
const Review = db.Review;
const Brand = db.Brand;
const TypeComponent = db.TypeComponent;
const test = () => {
    Product.findOne({
            where: {
                product_id: {
                    [Op.eq]: 2
                }
            },
            include: ["categories", "typeComponent"]
        })
        .then(item => {
            let i = item.typeComponent.pop();
            console.log(i.dataValues)
        })
        .catch()
}

test();
