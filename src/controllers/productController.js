const path =require('path');
const productController ={

    productEdit: (req,res)=>{
        res.render(path.join(__dirname ,'../views/products/productEdit'));
    },
    productCreate : (req,res) =>{
        res.render(path.join(__dirname ,'../views/products/productCreate'));
    },
}

module.exports= productController;
