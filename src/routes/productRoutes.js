const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');


router.get('/product', productsController.productEdit);
router.get('/productCreate', productsController.productCreate);


/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.home); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.productCreate); 
router.post('/',productsController.productStore); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.productDetail); 


module.exports= router;
