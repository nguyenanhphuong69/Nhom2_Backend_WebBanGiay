const knex = require('../db/database.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


module.exports = {
    async getAllCustomerAccount() {
        let users = await knex('nguoidung').select('*').where({
          admin: 0,
        });
        return users;
      },
}