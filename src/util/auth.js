const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: function (user) {
    return jwt.sign({ userId: user.ID }, "ecommerce", {
      expiresIn: "10d",
    });
  },
  verifyToken: function (token) {
    try {
      return jwt.verify(token, "ecommerce");
    } catch (error) {
      console.log(error);
      return;
    }
  },
};
