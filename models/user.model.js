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

  //đăng ký tài khoản
  async register(email, user) {
    let registered = await knex('nguoidung')
      .where('email', email)
      .select('email');
    var isRegistered = Object.values(JSON.parse(JSON.stringify(registered)));
    console.log(isRegistered.length);
    if (isRegistered.length === 1) {
      return {
        status: 400,
        message: 'This email has already been registered',
      };
    } else {
      let id = await knex('nguoidung').insert(user).returning('id');
      return {
        status: 200,
        message: `Registered account with id : ${id}  successfully`,
      };
    }
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

  //chỉnh sửa thông tin cho tất cả tài khoản (admin)
  async updateAllUser(id, user) {
    await knex('nguoidung').update(user).where('id', id);
    return {
      status: 200,
      message: `Update user with id : ${id} successfully`,
    };
  },

  //thay đổi mật khẩu
  async changePassword(id, user, oldPassword) {
    //kiểm tra tài khoản có tồn tại không
    let data = await knex('nguoidung').where({
      id: id,
    });
    let existUser = Object.values(JSON.parse(JSON.stringify(data)));
    if (existUser.length === 1) {
      let match = await bcrypt.compare(oldPassword, existUser[0].password);
      if (match) {
        await knex('nguoidung').update(user).where('id', id);
        return {
          status: 200,
          message: 'Change password successfully',
        };
      } else {
        return {
          status: 400,
          message: 'Wrong old password',
        };
      }
    } else {
      return {
        status: 400,
        message: 'This account does not exist',
      };
    }
  },

  //chỉnh sửa tài khoản đang đăng nhập (customer )
  async updateProfile(id, user) {
    await knex('nguoidung').update(user).where('id', id);
    return {
      status: 200,
      message: 'Update successfully',
    };
  },

  //xóa tài khoản (admin)
  async deleteUser(id) {
    let result = await knex('nguoidung').del().where('id', id);
    return result;
  },
  
}


