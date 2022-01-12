const Order = require("../models/order");

module.exports = {
  listOrders: function (req, res) {
    let data = req.body;
    Order.listOrders(function (err, result) {
      if (err) {
        return res.status(500).send({
          error: err,
          message: "Error in fetching data",
          success: true,
        });
      }

      return res.status(200).send({
        message: "Succesfully fetched all orders",
        orders: result,
        success: true,
      });
    }, data);
  },
  getOrderDetails: function (req, res) {
    let data = req.body;
    Order.getOrderDetails(function (err, result) {
      if (err) {
        return res.status(500).send({
          error: err,
          message: "Error in fetching data",
          success: true,
        });
      }

      return res.status(200).send({
        message: "Succesfully fetched order details",
        orders: result,
        success: true,
      });
    }, data);
  },
};
