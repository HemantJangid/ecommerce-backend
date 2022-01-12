const sqlConnection = require("../services/sqlConnection");

module.exports = {
  addOrderItem: function (cb, data) {
    let sql =
      "INSERT INTO OrderItems (OrderID, ProductID, Quantity, CreatedAt, UpdatedAt) VALUES (?, ?, ?, now(), now())";

    let values = [];
    values.push(data.orderId);
    values.push(data.productId);
    values.push(data.quantity);
    sqlConnection.executeQuery(sql, values, function (err, result) {
      cb(err, result);
    });
  },
  editOrderItem: function (cb, data) {
    let sql =
      "UPDATE OrderItems SET Quantity = ?, UpdatedAt = now() WHERE OrderID = ? AND ProductID = ?";
    let values = [];
    values.push(data.quantity);
    values.push(data.orderId);
    values.push(data.productId);
    sqlConnection.executeQuery(sql, values, function (err, result) {
      cb(err, result);
    });
  },
  deleteOrderItem: function (cb, data) {
    let sql = "DELETE FROM OrderItems WHERE OrderID = ? AND ProductID = ?";
    let values = [];
    values.push(data.orderId);
    values.push(data.productId);
    sqlConnection.executeQuery(sql, values, function (err, result) {
      cb(err, result);
    });
  },
  getOrderItems: function (cb, data) {
    let sql = "SELECT * FROM OrderItems WHERE OrderID = ?";
    let values = [];
    values.push(data.orderId);
    sqlConnection.executeQuery(sql, values, function (err, result) {
      cb(err, result);
    });
  },
};
