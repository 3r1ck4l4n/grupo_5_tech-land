const {Product, Category, Brand, TypeComponent} = require('../../../DataBase/models');
const {Op} = require('sequelize');

const productsController = {
    productList: (req, res) => {
            let page = req.query.page;
            let limit = 8;
            let offset = (page - 1) * limit;
        Promise.all([
                Product.findAndCountAll({
                    include: [
                        {
                            as: 'categories',
                            model: Category,
                            where: {
                                name_category: {
                                    [Op.eq]: 'Destacados'
                                }
                            }
                        }
                    ]
                }),
                Product.findAndCountAll({
                    include: [
                        {
                            as: 'categories',
                            model: Category,
                            where: {
                                name_category: {
                                    [Op.eq]: 'Agregados recientemente   '
                                }
                            }
                        }
                    ]
                }),
                Product.findAndCountAll({
                    include: [
                        {
                            as: 'categories',
                            model: Category,
                            where: {
                                name_category: {
                                    [Op.eq]: 'Más vendidos'
                                }
                            }
                        }
                    ]
                }),
                Product.findAndCountAll({
                    include: [
                        {
                            as: 'categories',
                            model: Category,
                            where: {
                                name_category: {
                                    [Op.eq]: 'En oferta'
                                }
                            }
                        }
                    ]
                }),
                Product.findAll({
                    limit:limit ,
                    offset:offset,
                    include: [
                        {
                            as: 'categories',
                            model: Category,
                        },
                        {
                            as: 'brands',
                            model: Brand
                        },
                        {
                            as: 'typeComponent',
                            model: TypeComponent
                        }
                    ]
                })
            ]
            
            )
            .then(response => {
                let destacados = response[0].count;
                let agregadosRecientemente = response[1].count;
                let masVendidos = response[2].count;
                let enOferta =response[3].count;
                let totalProductos = response[4].length;
                let arrayProducts = response[4].filter(product=> {
                    console.log(product.categories);
                    delete product.dataValues.stock;
                    delete product.dataValues.availability;
                    delete product.dataValues.price;
                    delete product.dataValues.brand_id;
                    delete product.dataValues.created_at;
                    delete product.dataValues.update_at;
                    product.dataValues.categories = product.dataValues.categories.filter(cat=>{
                        delete cat.dataValues.category_id
                        delete cat.dataValues.description_category
                        delete cat.dataValues.product_categories
                        return cat
                    });
                    product.dataValues.typeComponent = product.dataValues.typeComponent.filter(type=>{
                        delete type.dataValues.type_component_id
                        delete type.dataValues.description_type_component
                        delete type.dataValues.product_type_component
                        return type
                    });
                    return product;
                });
                let products ={
                    "count": totalProductos,
                    "countByCategory":{
                        "destacados": destacados,
                        "agregados_recientemente": agregadosRecientemente,
                        "mas_vendidos": masVendidos,
                        "en_oferta": enOferta,
                    },
                    "products": arrayProducts
                    
                    
                }
                return res.status(200).json(products);
                
            })
            .catch(error => res.json(error));
    },
    userId: (req, res) => {
    
    }
};

module.exports = productsController;