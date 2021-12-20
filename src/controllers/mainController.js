
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');


const listOfProducts = require("../../public/js/listOfProducts");
const reviews = require("../../public/js/reviews");
const mainController = {
    leerData: () => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		return products;
	},
    home: (req, res)=>{   
        let products = mainController.leerData(); 
        const destacados = products.filter(product => (product.type == 'Destacados'));
        const enOferta = products.filter(product => (product.type == "En oferta"));
        res.render('home', {destacados,enOferta});        
    },
    login: (req, res)=>{
        res.render('login');
    },
    register: (req, res)=>{
        res.render('register');
    },
    productCart: (req, res)=>{               
        res.render(path.join(__dirname, "../views/products/productCart"), {listOfProducts: listOfProducts });
    }
}

module.exports=mainController;