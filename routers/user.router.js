const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
router.get(
    "/customerAccount",
    userController.getAllCustomerAccount
  );


module.exports = router;