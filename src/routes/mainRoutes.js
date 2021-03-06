const express = require('express');
const router = express.Router();
const mainController = require('../controllers/apiController/mainController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/home', mainController.home);
router.get('/login',mainController.login);
router.get('/register',mainController.register);
router.post('/addItem',authMiddleware, mainController.addItemToCar);
router.get('/productCart',authMiddleware, mainController.productCart);
// router.get('/productDetail/:id',mainController.productDetail);





module.exports = router;
