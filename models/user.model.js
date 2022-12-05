const knex = require('../db/database.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


module.exports = {
  //lấy toàn bộ tài khoản customer (admin)
  async getAllCustomerAccount() {
    let users = await knex('nguoidung').select('*').where({
      admin: 0,
    });
    return users;
  },

  //lấy toàn bộ tài khoản admin (admin)
  async getAllAdminAccount() {
    let users = await knex('nguoidung').select('*').where({
      admin: 1,
    });
    return users;
  },

  //Lấy thông tin tài khoản đang đăng nhập
  async getProfile(id) {
    let user = await knex('nguoidung')
      .select(
        'id',
        'hoten',
        'username',
        'ngaysinh',
        'gioitinh',
        'email',
        'dienthoai',
        'public_id',
        'url'
      )
      .where('id', id);
    return user;
  },

  //đăng nhập tài khoản admin
  async loginAdmin(email, password) {
    //kiểm tra tài khoản có tồn tại không
    let admin = await knex('nguoidung').where({
      email: email,
      admin: 1,
    });
    let isAdmin = Object.values(JSON.parse(JSON.stringify(admin)));
    // console.log(isAdmin);
    if (isAdmin.length === 1) {
      //return isAdmin[0].password;
      let match = await bcrypt.compare(password, isAdmin[0].password);
      if (match) {
        let id = isAdmin[0].id;
        let admin = isAdmin[0].admin;

        let accessToken = jwt.sign(
          { id, admin },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '1h',
          }
        );

        let refreshToken = jwt.sign(
          { id, admin },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: '1d',
          }
        );

        await knex('nguoidung')
          .where({
            id: id,
          })
          .update({
            refresh_token: refreshToken,
            thisKeyIsSkipped: undefined,
          });

        return {
          status: 200,
          message: 'Login successful',
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
      } else {
        return {
          status: 401,
          message: 'Wrong password',
        };
      }
    } else {
      return {
        status: 401,
        message: 'This account does not exists',
      };
    }
  },

  //đăng nhập tài khoản customer
  async loginCustomer(email, password) {
    //kiểm tra tài khoản có tồn tại không
    let customer = await knex('nguoidung').where({
      email: email,
      admin: 0,
    });
    let isCustomer = Object.values(JSON.parse(JSON.stringify(customer)));
    // console.log(isCustomer);
    if (isCustomer.length === 1) {
      //return isCustomer
      let match = await bcrypt.compare(password, isCustomer[0].password);
      if (match) {
        let id = isCustomer[0].id;
        let admin = isCustomer[0].admin;

        let accessToken = jwt.sign(
          { id, admin },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '1h',
          }
        );

        let refreshToken = jwt.sign(
          { id, admin },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: '1d',
          }
        );

        await knex('nguoidung')
          .where({
            id: id,
          })
          .update({
            refresh_token: refreshToken,
            thisKeyIsSkipped: undefined,
          });

        return {
          status: 200,
          message: 'Login successful',
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
      } else {
        return {
          status: 401,
          message: 'Wrong password',
        };
      }
    } else {
      return {
        status: 401,
        message: 'This account is not existed',
      };
    }
  },
  //refresh token
  async refreshToken(token) {
    if (!token) {
      return {
        status: 400,
        message: 'Please Login',
      };
    } else {
      let user = await knex('nguoidung').where('refresh_token', token);
      let isUser = Object.values(JSON.parse(JSON.stringify(user)));
      console.log(isUser);
      if (isUser.length === 1) {
        let id = isUser[0].id;
        let admin = isUser[0].admin;

        let accessToken = jwt.sign(
          { id, admin },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '1h',
          }
        );

        return {
          status: 200,
          accessToken: accessToken,
        };
      } else {
        return {
          status: 400,
          message: 'Please Login',
        };
      }
    }
  },

  //logout
  async logout(token) {
    if (!token) {
      return {
        status: 400,
        message: 'Token does not exists',
      };
    } else {
      let user = await knex('nguoidung').where('refresh_token', token);
      let isUser = Object.values(JSON.parse(JSON.stringify(user)));
      console.log(isUser);
      if (isUser.length === 1) {
        let id = isUser[0].id;
        await knex('nguoidung').where('id', id).update({
          refresh_token: null,
          thisKeyIsSkipped: undefined,
        });

        return {
          status: 200,
          message: 'Logout successfully',
        };
      } else {
        return {
          status: 403,
          message: 'Not found data in token',
        };
      }
    }
  },
}


