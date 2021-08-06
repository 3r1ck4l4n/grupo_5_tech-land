const express = require("express");

const app = express();

const path = require("path");

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

app.listen(3000, ()=>{
    console.log("Server running at port 3000");
});

app.get("/productDetail", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "./views/productDetail.html"));
});

app.get("/home", (req, res)=>{
    res.sendFile(path.resolve(__dirname,"./views/home.html"));
});