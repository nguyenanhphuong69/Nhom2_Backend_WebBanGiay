const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const checkAuth = require("../middleware/checkAuth.js");
//lấy tất cả thông tin tài khoản admin
router.get(
  "/adminAccount",
  checkAuth.checkAuthAdmin,
  userController.getAllCustomerAccount
);

//lấy thông tin tài khoản đang đăng nhập
router.get("/profile", checkAuth.checkAuthAdmin, userController.getProfile);

//đăng nhập tài khoản admin
router.post("/login", userController.loginAsAdmin); 

//refresh token
router.get("/refreshToken", userController.refreshToken);

//Logout
router.get("/logout", userController.logout);

module.exports = router;