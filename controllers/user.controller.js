const userModel = require('../models/user.model.js');
const bcrypt = require('bcrypt');
module.exports = {
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
      }
}

 