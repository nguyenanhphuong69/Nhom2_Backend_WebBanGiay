const userModel = require('../models/user.model.js');
const bcrypt = require('bcrypt');
module.exports = {
  //lấy toàn bộ tài khoản Customer
  getAllCustomerAccount(req, res) {
    userModel
      .getAllCustomerAccount()
      .then((users) => {
        return res.status(200).json({
          status: 200,
          message: 'Get all customer accounts successfully',
          data: users,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          status: 400,
          message: 'Failed to get all customer accounts',
          data: err,
        });
      });
  },
  //lấy toàn bộ tài khoản admin với role admin
  getAllAdminAccount(req, res) {
    userModel
      .getAllAdminAccount()
      .then((users) => {
        return res.status(200).json({
          status: 200,
          message: 'Get all admin accounts successfully',
          data: users,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          status: 400,
          message: 'Failed to get all admin accounts',
          data: err,
        });
      });
  }, 
  //lấy thông tin tài khoản đang đăng nhập
  getProfile(req, res) {
    const userId = req.userData.id;
    userModel
      .getProfile(userId)
      .then((profile) => {
        return res.status(200).json({
          status: 200,
          message: 'Get profile successfully',
          data: profile,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          status: 400,
          message: 'Failed to get profile',
          data: error,
        });
      });
  },
  //đăng nhập tài khoản admin
  loginAsAdmin(req, res) {
    const { email, password } = req.body;
    userModel
      .loginAdmin(email, password)
      .then((data) => {
        res.cookie('refreshToken', data.refreshToken, {
          httpOnly: true,
          // path: "/user/refresh_token",
          maxAge: 24 * 60 * 60 * 1000,
        });
        return res.json(data);
      })
      .catch((err) => {
        return res.status(400).json({
          status: 400,
          message: 'Failed to login',
          data: err,
        });
      });
  },
  //đăng nhập tài khoản customer
  loginAsCustomer(req, res) {
    const { email, password } = req.body;
    userModel
      .loginCustomer(email, password)
      .then((data) => {
        res.cookie('refreshToken', data.refreshToken, {
          httpOnly: true,
          // path: "/user/refresh_token",
          maxAge: 24 * 60 * 60 * 1000,
        });
        return res.json(data);
      })
      .catch((err) => {
        return res.status(400).json({
          status: 400,
          message: 'Failed to login',
          data: err,
        });
      });
  },
  //refresh token
  refreshToken(req, res) {
    //res.json(req.cookies.refreshToken)
    const token = req.cookies.refreshToken;
    userModel
      .refreshToken(token)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(400).json({
          status: 400,
          message: 'Failed to refresh token',
        });
      });
  },
  //logout
  logout(req, res) {
    // const token = browser.cookies.get({
    //   url: "/user/refresh_token",
    //   name: "refreshToken",
    // });
    // return res.json(token);

    const token = req.cookies.refreshToken;

    userModel
      .logout(token)
      .then((result) => {
        res.clearCookie('refreshToken');
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(400).json({
          status: 400,
          message: 'Logout failed',
          data: err,
        });
      });
  },

}

 