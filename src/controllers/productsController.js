const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/products.json");
const reviews = require("../../public/js/reviews");

const productsController = {
    leerData: () => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
        return products;
    },
    home: (req, res) => {
        let products = productsController.leerData();
        res.render(path.join(__dirname, "../views/products/products"), {products: products});
    },
    productDetail: (req, res) => {
        let products = productsController.leerData();
        let item =
            products.find((item) => item.id == req.params.id);


        res.render(path.join(__dirname, "../views/products/productDetail"), {
            item: item,
            products: products,
            reviews: reviews,
        });
    },
    productStore: (req, res) => {
      console.log(req.body)
        const newP=req.body;
        delete newP.type;
        delete newP.brand;
        delete newP.category;
        console.log(newP);
        let products = productsController.leerData();
        let newProduct = {
            ...req.body,
            id: products[products.length - 1].id + 1,
        };

        req.file
            ? (newProduct.img = "/images/home/" + req.file.filename)
            : (newProduct.img = "/images/home/default-image.png");

        products.push(newProduct);
        let newProducts = JSON.stringify(products, null, " ");
        fs.writeFileSync(productsFilePath, newProducts, "utf-8");

        res.redirect("home");
    },
    productCreate: (req, res) => {
        res.render(path.join(__dirname, "../views/products/productCreate"));
    },
    productEdit: (req, res) => {
        let products = productsController.leerData();
        let item =
            products.find((item) => item.id == req.params.id) ||
            promotionProductsList.find((item) => item.id == req.params.id);
        res.render(path.join(__dirname, "../views/products/productEdit"), {item});
    },
    productUpdate: (req, res) => {
        let products = productsController.leerData();
        let id = req.params.id;
        let productToEdit = products.find((product) => product.id == id);
        let newProduct = {
            id: req.params.id,
            ...req.body,
        };
        let oldImg = path.join(__dirname, "../../public" + productToEdit.img);
        fs.unlinkSync(oldImg);
        req.file
            ? (newProduct.img = "/images/home/" + req.file.filename)
            : (newProduct.img = "/images/home/default-image.png");
        let newProducts = products.map((product) =>
            product.id == productToEdit.id ? (product = {...newProduct}) : product
        );
        fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, " "));

        res.redirect('/home');
    },
    delete: (req, res) => {
        let id = req.params.id;
        let products = productsController.leerData();
        products = products.filter(product => product.id != id);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
        res.redirect('/home');
    }
};

module.exports = productsController;
