const {check} = require('express-validator');
const path = require("path");

const productCreateValidationsBack = [
check("name_product")
    .notEmpty().withMessage("Ingresa el nombre del producto").bail()
    .isLength({min: 5}).withMessage("El nombre del producto debe contener al menos 5 caracteres").bail(),
check("description")
    .notEmpty().withMessage("Debes poner una descripción del producto").bail()
    .isLength({min:20}).withMessage("La descripción del producto debe contener por lo menos 20 caracteres").bail(),
check("image_product")
    .custom((value, { req }) => {
    if (!req.file) {
      console.log("this");
      throw new Error("Imagen de producto no enviada");
    }
    return true;
  })
  .bail()
  .custom((value, { req }) => {
    let extension = path.extname(req.file.filename);
    if (
      extension !== ".jpeg" &&
      extension !== ".jpg" &&
      extension !== ".png"
    ) {
      throw new Error("El archivo no es una imagen png, jpg o jpeg");
    }
    return true;
  }),
check("price")
    .notEmpty().withMessage("Debes escribir el precio del producto").bail()
    .isNumeric().withMessage("El precio del producto debe ser un número").bail(),
check("stock")
  .notEmpty().withMessage("Debes escribir la cantidad de stock que hay del producto").bail()
  .isNumeric().withMessage("El stock debe ser un número")

];

module.exports = productCreateValidationsBack;