const sqlConnection = require("../services/sqlConnection");
const bcrypt = require("bcryptjs");
const auth = require("../util/auth");

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
    let sql = "SELECT Username, Password, UserType FROM Users WHERE Username=?";
    let values = [];
    values.push(data.userName);
    sqlConnection.executeQuery(sql, values, function (err, result) {
      let isValidPassword = bcrypt.compareSync(
        data.password,
        result[0].Password
      );
      if (isValidPassword) {
        const token = auth.generateToken(result[0]);
        cb(err, { ...result[0], authToken: token });
      } else {
        cb(err, []);
      }
    });
  },
  getUserById: function (cb, id) {
    let sql = "SELECT Username, Password, UserType FROM Users WHERE ID=?";
    let values = [];
    values.push(id);
    sqlConnection.executeQuery(sql, values, function (err, result) {
      cb(err, result[0]);
    });
  },
};
