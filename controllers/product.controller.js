const productModel = require("../models/product.model.js");
const bcrypt = require('bcrypt');

module.exports = {
  //lấy toàn bộ sản phẩm
  getAllProducts(req, res) {
    productModel
      .getAllProduct()
      .then((data) => {
        res.status(200).json({
          status: 200,
          msg: "Get all products successfully",
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: 400,
          msg: "Failed to get all products",
          data: error,
        });
      });
  },
};