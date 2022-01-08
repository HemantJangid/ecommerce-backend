const sqlConnection = require("../services/sqlConnection");
const bcrypt = require("bcryptjs");

module.exports = {
  signup: function (cb, data) {
    let sql =
      "INSERT INTO Users (Username, Password, CreatedAt, UpdatedAt) VALUES (?, ?, now(), now())";
    var values = [];
    values.push(data.userName);
    values.push(data.password);

    sqlConnection.executeQuery(sql, values, function (err, result) {
      cb(err, result);
    });
  },
  securedSignup: function (cb, data) {
    let sql =
      "INSERT INTO Users (Username, Password, CreatedAt, UpdatedAt) VALUES (?, ?, now(), now())";
    var values = [];
    values.push(data.userName);

    bcrypt.hash(data.password, 8, function (err, hash) {
      if (err) {
        console.log(err);
        return;
      }
      values.push(hash);
      sqlConnection.executeQuery(sql, values, function (err, result) {
        cb(err, result);
      });
    });
  },
  getUsersSignupDetails: function (cb, data) {
    let sql = "SELECT * FROM Users WHERE Username=?";
    let values = [];
    values.push(data.userName);

    sqlConnection.executeQuery(sql, values, function (err, result) {
      console.log(err);
      cb(err, result);
    });
  },
  signin: function (cb, data) {
    let sql = "SELECT * FROM Users WHERE Username=? and Password=?";
    let values = [];
    values.push(data.userName);
    values.push(data.password);

    sqlConnection.executeQuery(sql, values, function (err, result) {
      cb(err, result);
    });
  },
  securedSignin: function (cb, data) {
    let sql = "SELECT * FROM Users WHERE Username=?";
    let values = [];
    values.push(data.userName);
    sqlConnection.executeQuery(sql, values, function (err, result) {
      let isValidPassword = bcrypt.compareSync(
        data.password,
        result[0].Password
      );
      if (isValidPassword) {
        cb(err, result);
      } else {
        cb(err, []);
      }
    });
  },
};
