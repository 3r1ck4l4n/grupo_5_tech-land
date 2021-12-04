const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const productsController1 = require('../controllers/apiController/productsController');
const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
    filename: function (req, file, callback) {
    callback(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
  },
  destination: function (req, file, callback) {
    
    callback(null, path.join(__dirname,'../../public/images/home'));
  }
  
});

const upload = multer({storage:storage});



router.get('/product', productsController.productEdit);
router.get('/productCreate', productsController.productCreate);


/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController1.home);

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.productCreate); 
router.post('/',upload.single('image_product'),productsController1.productStore);


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController1.productDetail);

/*** UPDATE ONE PRODUCT ***/
router.get('/edit/:id', productsController1.productEdit);
router.patch('/edit/:id',upload.single('product-image'), productsController1.productUpdate);

/*** DELETE ONE PRODUCT ***/
router.delete('/delete/:id', productsController1.delete);



module.exports= router;
