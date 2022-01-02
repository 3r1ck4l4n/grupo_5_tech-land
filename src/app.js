const express = require("express");
const app = express();
const path = require("path");
const router= require('./routes/mainRoutes');
const routerProduct= require('./routes/productRoutes');
const routerUser = require('./routes/userRoutes');
const customersRoutes = require('./routes/apiRoutes/apiRoutes');
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

app.listen(3001, () => {
  console.log("Server running at port 3001");
});
app.use('/', router);
app.use('/products',routerProduct);
app.use('/users', routerUser);
app.use('/api', customersRoutes);
app.use((req, res, next)=>{
  res.status(404).render('notFound');
});