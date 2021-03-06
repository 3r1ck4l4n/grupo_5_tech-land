const db = require('../../DataBase/models');
const {Op} = require('sequelize');
const {validationResult} = require('express-validator');

const Product = db.Product;
const Category = db.Category;
const Review = db.Review;
const Customer = db.Customer;
const Brand = db.Brand;
const TypeComponent = db.TypeComponent;
const Product_Type_Component = db.Product_Type_Component;
const Product_Category = db.Product_Category;

let productsController = {
    home: (req, res) => {
        let notFound = {
            error: "Product not found",
            state: 204
        }
        Product.findAll({
                where: {
                    availability: {
                        [Op.eq]: true
                    }
                }
            })
            .then(products => {
                res.render('products/products.ejs', {products: products});
            })
            .catch(error => {
                res.render(('products/products.ejs'), {error: notFound})
            });
    },
    productDetail: (req, res) => {
        console.log(req.params.id);
        let products = [];
        Product.findAll({
                include: [{
                    as: 'categories',
                    model: Category,
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
            .catch(error => products.push(error));
        
        Product.findAll({
            include: {
                model: 'categories',
                where: {
                    categories_id: 'Destacados'
                }
            }
        })
        Product.findByPk(req.params.id, {
                include: [{
                    model: Review,
                    as: 'reviews',
                    include: [{
                        model: Customer,
                        as: 'customer'
                    }]
                }]
            })
            .then(item => {
                res.render('products/productDetail.ejs', {
                    products: products,
                    item: item,
                    reviews: item.reviews
                });
                item.reviews.forEach(p => {
                    console.log(p.dataValues)
                })
            })
            .catch(error => res.render('notFound' + error));
    },
    productCreate: (req, res) => {
        res.render("/products/productCreate.ejs");
    },
    //Funci??n para crear productos, edita la tabla de Categories y la de TypeComponents.
    productStore: (req, res) => {
        console.log(req.body);
        
        //Se valida que el middleware no detectara errores
        let errors = validationResult(req); //express-validator
        if (!errors.isEmpty()) {
            console.log(errors.mapped())
            //Redirige a una pagina de error
            return res.render('./products/productCreate.ejs',{
                errors:errors.mapped(),
                oldData:req.body
            });
        } else {
            /** @Author: Erick Luna
             ** Creaci??n de promesas para buscar las marcas , tipos de componente y categor??as deseadas para registrar las FK en la tala de producto
             ** Se utiliza un ORM llamado Sequelize; nos facilita la interacci??n con base de datos
             * */
            Promise.all([
                Brand.findOne({
                    where: {
                        name_brand: req.body.brand
                    }
                }),
                Category.findOne({
                    where: {
                        name_category: req.body.category
                    }
                }),
                TypeComponent.findOne({
                    where: {
                        name_type_component: req.body.type
                    }
                })
            ])
                //Si el resultado de las promesas anteriores es el positivo, nos permite almacenar el producto
            .then(([brand, category, type]) => {
                let availability = req.body.stock > 0 ? 1 : 0;
                let image = req.file
                    ? ("/images/home/" + req.file.filename)
                    : ("/images/home/default-image.png");
                Product.create({
                        name_product: req.body.name_product,
                        description: req.body.description,
                        stock: req.body.stock,
                        availability: availability,
                        image_product: image,
                        price: req.body.price,
                        brand_id: brand.dataValues.brand_id
                    })
                    //Si el producto se guarda correctamente, env??a una respuesta de tipo JSON
                    .then(product => {
                        console.log(product);
                        Promise.all([
                                Product_Type_Component.create({
                                    type_component_id: type.dataValues.type_component_id,
                                    product_id: product.dataValues.product_id
                                }),
                                Product_Category.create({
                                    category_id: category.dataValues.category_id,
                                    product_id: product.dataValues.product_id
                                })
                            ])
                            .then(result => {
                                console.log(result);
                                // Envia un estatus de creaci??n favorable y un response
                                res.status(201).json({
                                    status:201,
                                    response: result
                                });
                                //res.redirect("home");
                            })
                            .catch(error => console.log(error));
                    })
                    .catch(error => console.log(error));
            })
                //En caso de existir alg??n error, cae en el catch e imprime el error en consola
            .catch(error => console.log(error));

        }
        
    },
    productEdit: (req, res) => {
        console.log("Into api Controller");
        Product.findOne({
                where: {
                    product_id: {
                        [Op.eq]: req.params.id
                    }
                },
                include: ["categories", "typeComponent"]
            })
            .then(result => {
                let typeComponent = result.typeComponent.pop();
                console.log(typeComponent)
                let category = result.categories.pop();
                console.log(category)
                let item;
                Brand.findOne({
                        where: {
                            brand_id: {
                                [Op.eq]: result.dataValues.brand_id
                            }
                        }
                    })
                    .then(brand => {
                        item = {
                            id: result.dataValues.product_id,
                            name: result.dataValues.name_product,
                            description: result.dataValues.description,
                            stock: result.dataValues.stock,
                            price: result.dataValues.price,
                            brand: brand.dataValues.name_brand,
                            type: typeComponent.dataValues.name_type_component,
                            category: category.dataValues.name_category
                        };
                        console.log(item);
                        res.render("products/productEdit", {item});
                    })
            })
            .catch(error => res.send(error));
    },
    productUpdate: (req, res) => {
        let errors = validationResult(req); //express-validator
        if (!errors.isEmpty()) {
            console.log(errors.mapped());
            console.log(req.body);
            return res.render('./products/productEdit',{
                errors:errors.mapped(),
                oldData:{
                    id: req.params.id,
                    ...req.body}                
            });
        } else {
            console.log(req.body)
        Promise.all([
                Brand.findOne({
                    where: {
                        name_brand: req.body.brand
                    }
                }),
                Category.findOne({
                    where: {
                        name_category: req.body.category
                    }
                }),
                TypeComponent.findOne({
                    where: {
                        name_type_component: req.body.type
                    }
                })
            ])
            .then(([brand, category, type]) => {
                console.log(category)
                
                let availability = req.body.stock > 0 ? 1 : 0;
                let image = req.file
                    ? ("/images/home/" + req.file.filename)
                    : ("/images/home/default-image.png");
                Product.update({
                        name_product: req.body.name,
                        description: req.body.description,
                        stock: req.body.stock,
                        availability: availability,
                        image_product: image,
                        price: req.body.price,
                        brand_id: brand.dataValues.brand_id
                    },
                    {
                        where: {
                            product_id: req.params.id
                        }
                    })
                    .then(product => {
                        if (product == 1) {
                            console.log(type);
                            Promise.all([
                                    Product_Type_Component.create({
                                        type_component_id: type.dataValues.type_component_id,
                                        product_id: req.params.id
                                    }),
                                    Product_Category.create({
                                        category_id: category.dataValues.category_id,
                                        product_id: req.params.id
                                    })
                                ])
                                .then(result => {
                                    console.log("Accion realizada" + result);
                                    res.redirect("../../home");
                                })
                                .catch(error => {
                                    console.log(error);
                                    res.redirect("../../home");
                                });
                        }
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        }

        
    },
    delete: (req, res) => {
        let availability = 0;
        console.log("In delete***************")
        Product.update({
                availability: availability
            },
            {
                where: {
                    product_id: req.params.id
                }
            })
            .then(response=> {
                console.log(response)
                res.redirect("../../home");
            }).catch(error=> console.log(error));
    }
};

module.exports = productsController;