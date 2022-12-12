const knex = require("../db/database.js");
 //xem hóa đơn của tất cả khách hàng (admin)
 module.exports = {
    async getAllBill() {
        let bills = await knex("hoadon")
        .join("nguoidung", "nguoidung.id", "hoadon.id_nd")
        .join("hinhthucthanhtoan", "hinhthucthanhtoan.id", "hoadon.id_thanhtoan")
        .join("danhsach_diachi", "danhsach_diachi.id", "hoadon.id_diachi")
        .select(
            "hoadon.id",
            "nguoidung.url",
            "nguoidung.hoten",
            "hinhthucthanhtoan.ten_hinhthuc",
            "danhsach_diachi.diachi",
            "hoadon.ngaydathang",
            "hoadon.tong_sl",
            "hoadon.tong_hd",
            "hoadon.tinhtrangHD",
            "hoadon.createdAt",
            "hoadon.updatedAt",
            "hoadon.deleted_fg"
        );
        return bills;
    }
};