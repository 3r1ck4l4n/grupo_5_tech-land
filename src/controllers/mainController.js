const path = require("path");

const listOfProducts = require(path.resolve("./public/", "js/listOfProducts.js"));


const mainController = { 
    home: (req, res)=>{          
        res.render('home', {listOfProducts: listOfProducts });
    },
    detail: (req, res)=>{        
        let item = listOfProducts.find(item => item.id == req.params.id);
        res.render("productDetail", {item:item, listOfProducts: listOfProducts})
    },
    showCart: (req, res)=>{               
        res.render("productCart", {listOfProducts: listOfProducts });
    }
}

module.exports=mainController;