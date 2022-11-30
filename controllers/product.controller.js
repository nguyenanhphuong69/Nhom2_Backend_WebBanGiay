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

    //lấy chi tiết sản phẩm
    getProductId(req, res) {
      const id = req.params.id;
      productModel
        .getProductId(id)
        .then((data) => {
          res.status(200).json({
            status: 200,
            msg: `Get product with id: ${id} successfully`,
            data: data,
          });
        })
        .catch((error) => {
          res.status(400).json({
            status: 400,
            msg: `Failed to get product with id: ${id}`,
            data: error,
          });
        });
    },
    
};