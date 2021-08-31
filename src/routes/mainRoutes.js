const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')

router.get('/home', mainController.home);
router.get("/productDetail/:id", mainController.detail);
router.get('/productCart', mainController.showCart);




module.exports = router;
