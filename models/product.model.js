const knex = require("../db/database.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

module.exports = {
  //lấy ra toàn bộ sản phẩm
  async getAllProduct() {
    let products = await knex("sanpham")
      .join("danhmuc", "danhmuc.id", "=", "sanpham.id_dm")
      .select(
        "sanpham.id",
        "sanpham.tensp",
        "sanpham.chitiet",
        "sanpham .size",
        "sanpham.gia",
        "sanpham.public_id",
        "sanpham.url",
        "sanpham.id_dm",
        "danhmuc.tendm",
        "sanpham.createdAt",
        "sanpham.updatedAt",
        "sanpham.deleted_fg"
      );
    return products;
  },
  
  //lấy chi tiết từng sản phẩm
  async getProductId(id) {
    let product = await knex("sanpham").select("*").where("id", id);
    return product;
  }

};