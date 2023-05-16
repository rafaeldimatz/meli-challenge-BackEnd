const express = require("express");

const productsController = require("../controllers/productsController")
const productDetailController = require("../controllers/productDetailController")

const routes = express.Router();

routes.get("/items",productsController.productosSearch);/* Datos de los productos buscados */
routes.get("/items/:id",productDetailController.productDetail);/* Detalle de un Producto */

module.exports = routes;

