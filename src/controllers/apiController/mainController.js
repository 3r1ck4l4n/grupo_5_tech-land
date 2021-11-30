const db = require('../../DataBase/models');
const {Op} = require('sequelize');

const mainController = {
    home: (req, res) => {
        Promise.all([
            db.Product.findAll({
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
    login: (req, res)=>{
        res.render('login');
    },
    register: (req, res)=>{
        res.render('register');
    },
    productCart: (req, res)=>{
        res.render( "products/productCart");
    }
};

module.exports = mainController;
