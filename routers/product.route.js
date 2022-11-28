const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller.js");


router.get("/productInfo", productController.getAllProducts);
module.exports = router;