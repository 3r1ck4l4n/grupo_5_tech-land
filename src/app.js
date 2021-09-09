const express = require("express");
const app = express();
const path = require("path");
const router= require('./routes/mainRoutes');
const routerProduct= require('./routes/productRoutes');
const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'./views/'));
app.listen(3000, () => {
  console.log("Server running at port 3000");
});
app.use('/', router);
// app.use('/login', router);
// app.use('/register', router);
// app.use('/productCart', router);
// app.use('/productDetail', router);
app.use('/products',routerProduct);
// app.use('/product',routerProduct)
// app.use('/productCreate',routerProduct)

// app.get("/productDetail", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./views/productDetail.html"));
// });

// app.get("/home", (req, res) => {
//   res.render('home');
// });

// app.get("/register", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./views/register.html"));
// });

// app.get("/login", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./views/login.html"));
// });

// app.get("/productCart", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./views/productCart.html"));
// });

// app.get("/createProduct", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "./views/createProduct.html"));
//  });

