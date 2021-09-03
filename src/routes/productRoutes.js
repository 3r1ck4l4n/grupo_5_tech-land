const express = require('express');
const route = express.Router();
const productController = require('../controllers/productController');

route.get('/');
route.get('/product', productController.productEdit);
route.get('/productCreate', productController.productCreate);


module.exports= route;
