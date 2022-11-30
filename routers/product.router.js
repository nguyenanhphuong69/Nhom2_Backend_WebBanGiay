const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller.js");

//GET all product
router.get("/productInfo", productController.getAllProducts);
//GET one product
router.get("/:id", productController.getProductId);

module.exports = router;