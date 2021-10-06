const express = require("express");
const app = express();
const path = require("path");
const router= require('./routes/mainRoutes');
const routerProduct= require('./routes/productRoutes');
const routerUser = require('./routes/userRoutes');
const publicPath = path.resolve(__dirname, "../public");
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const session = require("express-session"); //Para usar sesiones
const cookieParser = require("cookie-parser"); // Para usar cookies
const userLoggedMiddleware = require("./middleware/userLoggedMiddleware");

app.use(cookieParser());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express.static(publicPath));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
  secret: "This is a secret, blabla",
  resave: false,
  saveUninitialized: false
}));


app.use(userLoggedMiddleware);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'./views/'));






app.listen(3000, () => {
  console.log("Server running at port 3000");
});
app.use('/', router);
app.use('/products',routerProduct);
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

// User routes

app.use('/users', routerUser);