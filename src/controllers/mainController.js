
const listOfProducts = require("../../public/js/listOfProducts");
const promotionProductsList = require("../../public/js/promotionProductsList");
const reviews = require("../../public/js/reviews");

const mainController = {
    home: (req, res)=>{          
        res.render('home', {listOfProducts: listOfProducts, promotionProductsList: promotionProductsList});
    },
    login: (req, res)=>{
        res.render('login');
    },
    register: (req, res)=>{
        res.render('register');
    },
    productCart: (req, res)=>{               
        res.render("productCart", {listOfProducts: listOfProducts });
    },
    productDetail: (req, res)=>{        
        let item = listOfProducts.find(item => item.id == req.params.id) || promotionProductsList.find(item => item.id == req.params.id);        
        res.render("productDetail", {item:item, listOfProducts: listOfProducts, reviews: reviews})
    },
}

module.exports=mainController;