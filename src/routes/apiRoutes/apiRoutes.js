const express = require('express');
const router = express.Router();
const customersController = require('../../controllers/apiController/DashBoardControllers/customersController');
const adminsController = require('../../controllers/apiController/DashBoardControllers/adminsController');
const productsController = require('../../controllers/apiController/DashBoardControllers/productsController');

router.get("/customers",customersController.customerList);
router.get("/customer/:id",customersController.customerId);

router.get("/admins",adminsController.adminsList);
router.get("/admin/:id",adminsController.adminId);

router.get("/products",productsController.productList);

module.exports = router;