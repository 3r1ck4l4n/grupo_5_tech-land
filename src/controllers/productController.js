
const productController ={

    productEdit: (req,res)=>{
        res.render('productEdit');
    },
    productCreate : (req,res) =>{
        res.render('productCreate');
    },
}

module.exports= productController;
