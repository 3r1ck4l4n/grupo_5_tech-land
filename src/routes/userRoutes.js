const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const validations = require('../middleware/validations');
const validationsLogin = require('../middleware/validationsLogin');
const upload = require('../middleware/uploadProfileImage');


router.get('/register', userController.register);
router.post('/register', upload.single('userImage'), validations, userController.createUser);
router.get('/login', userController.login);
router.post('/login', validationsLogin, userController.gettingLogged);
router.get('/profile', userController.profile);
router.get('/logout', userController.logout);


module.exports = router;