const cartModel = require("../models/cart.model.js");

module.exports = {
  //lấy ra giỏ hàng của khách hàng đang đăng nhập
  getCartOfUser(req, res) {
    const idUser = req.userData.id;
    cartModel
      .getCartOfUser(idUser)
      .then((cart) => {
        if (cart.length === 0) {
          return res.status(200).json({
            status: 200,
            message: "Your cart is empty",
            data: cart,
          });
        } else {
          return res.status(200).json({
            status: 200,
            message: "Get cart successfully",
            data: cart,
          });
        }
      })
      .catch((err) => {
        return res.status(400).json({
          status: 400,
          message: "Failed to get cart",
          data: err,
        });
      });
  },

  //lấy chi tiết giỏ hàng
  getCartItem(req, res) {
    const id = req.params.id;
    const idUser = req.userData.id;
    cartModel
      .getCartItem(id, idUser)
      .then((cartItem) => {
        return res.status(200).json({
          status: 200,
          message: "Get cart item successfully",
          data: cartItem,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          status: 400,
          message: "Failed to get cart item",
          data: err,
        });
      });
  },
}