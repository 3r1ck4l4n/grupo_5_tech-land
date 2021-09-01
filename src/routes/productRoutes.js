const express = require('express');
const route = express.Router();
const productController = require('../controllers/productController');

route.get('/');
route.get('/product', productController.productEdit);


module.exports= route;