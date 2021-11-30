const express = require('express');
const router = express.Router();
const mainController = require('../controllers/apiController/mainController');

router.get('/home', mainController.home);
router.get('/login',mainController.login);
router.get('/register',mainController.register);
router.get('/productCart',mainController.productCart);
// router.get('/productDetail/:id',mainController.productDetail);





module.exports = router;
