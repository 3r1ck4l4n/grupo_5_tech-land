const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const validations = require('../middleware/validations');
const upload = require('../middleware/uploadProfileImage');


router.get('/register', userController.register);
router.post('/register', upload.single('userImage'), validations, userController.createUser);
router.get('/login', userController.login);


module.exports = router;