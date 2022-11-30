const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller.js");
const checkAuth = require("../middleware/checkAuth.js");

//lấy ra giỏ hàng của khách hàng đang đăng nhập
router.get("/", checkAuth.checkAuthCustomer, cartController.getCartOfUser);

//lấy chi tiết giỏ hàng
router.get(
"/item/:id",
checkAuth.checkAuthCustomer,
cartController.getCartItem
);
module.exports = router;