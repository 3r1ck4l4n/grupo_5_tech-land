// const express = require('express');
// const router = express.Router();
const router = require('./mainRoutes');
const productController = require('../controllers/productController');

router.get('/createProduct',productController.create);

module.exports = router;
