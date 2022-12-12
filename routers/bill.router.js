const express = require("express");
const router = express.Router();
const billController = require("../controllers/bill.controller.js");
const checkAuth = require("../middleware/checkAuth.js");


//xem hóa đơn toàn bộ khách hàng (Admin)
router.get("/all", checkAuth.checkAuthAdmin, billController.getAllBill);

module.exports = router;