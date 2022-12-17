const billModel = require("../models/bill.model.js");

module.exports = {
  //xem hóa đơn toàn bộ khách hàng (Admin)
  getAllBill(req, res) {
    billModel
      .getAllBill()
      .then((bills) => {
        return res.status(200).json({
          status: 200,
          message: "Get all bills successfully",
          data: bills,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          status: 400,
          message: "Failed to get all bills",
          data: err,
        });
      });
  }
}