const path = require("path");

const listOfProducts = require(path.resolve("./public/", "js/listOfProducts.js"));


const mainController = {
    home: (req, res)=>{          
        res.render('home', {listOfProducts: listOfProducts });
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
        let item = listOfProducts.find(item => item.id == req.params.id);
        res.render("productDetail", {item:item, listOfProducts: listOfProducts})
    },
}

module.exports=mainController;