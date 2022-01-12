const User = require("../models/user");
const auth = require("../util/auth");

module.exports = {
  signup: function (req, res) {
    let data = req.body;
    if (data.userName && data.password) {
      User.getUsersSignupDetails(function (err, result) {
        if (err) {
          User.signup(function (err1, result) {
            if (err1) {
              return res.status(500).send({
                error: err1,
                message: "Error in saving user",
                success: true,
              });
            }
            return res.status(200).send({
              message: "Succesfully added a new user",
              success: true,
            });
          }, req.body);
        }
        return res.status(500).send({
          message: "A user with this username already exists",
          success: true,
        });
      }, data);
    }
  },
  securedSignup: function (req, res) {
    let data = req.body;
    if (data.userName && data.password) {
      User.getUsersSignupDetails(function (err, result) {
        if (result.length == 0) {
          User.securedSignup(function (err1, result) {
            if (err1) {
              return res.status(500).send({
                error: err1,
                message: "Error in saving user",
                success: true,
              });
            }
            return res.status(200).send({
              message: "Succesfully added a new user",
              success: true,
            });
          }, req.body);
        } else {
          return res.status(500).send({
            message: "A user with this username already exists",
            success: true,
          });
        }
      }, data);
    }
  },
  login: function (req, res) {
    let data = req.body;
    if (data.userName && data.password) {
      User.signin(function (err, result) {
        if (err) {
          return res.status(500).send({
            error: err,
            message: "Error in signin",
            success: true,
          });
        }
        if (result.length == 0) {
          return res.status(500).send({
            message: "Invalid Username or Password",
            success: true,
          });
        }
        return res.status(200).send({
          message: "logged in successfully",
          user: result[0],
          success: true,
        });
      }, data);
    }
  },
  securedLogin: function (req, res) {
    let data = req.body;
    if (data.userName && data.password) {
      User.securedSignin(function (err, result) {
        if (err) {
          return res.status(500).send({
            error: err,
            message: "Error in signin",
            success: true,
          });
        }
        if (result.length == 0) {
          return res.status(500).send({
            message: "Invalid Username or Password",
            success: true,
          });
        }
        return res.status(200).send({
          message: "logged in successfully",
          user: result,
          success: true,
        });
      }, data);
    }
  },
  isAuthenticated: function (req, res, next) {
    const token = req.headers.auth;
    try {
      let response = auth.verifyToken(token);
      User.getUserById(function (err, result) {
        if (err) {
          return res.status(401).send({
            message: "invalid user",
            err: error,
            success: true,
          });
        }
        req.user = result;
        next();
      }, response.id);
    } catch (error) {
      return res.status(500).send({
        message: "invalid token",
        err: error,
        success: true,
      });
    }
  },
};
