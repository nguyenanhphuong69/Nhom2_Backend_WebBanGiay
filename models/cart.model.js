const knex = require("../db/database.js");

module.exports = {
  //lấy ra giỏ hàng của khách hàng đang đăng nhập
  async getCartOfUser(idUser) {
    let data = await knex("giohang").select("*").where("id_nd", idUser);
    return data;
  },

  //lấy chi tiết giỏ hàng
  async getCartItem(id, idUser) {
    let data = await knex("giohang").select("*").where({
      id_nd: idUser,
      id: id,
    });
    return data;
  },
}