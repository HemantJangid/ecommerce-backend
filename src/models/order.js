const sqlConnection = require("../services/sqlConnection");

module.exports = {
  listOrders: function (cb, data) {
    let sql =
      "select * from ecommercedb.Users u inner join ecommercedb.OrderDetails o on u.ID = o.UserID inner join ecommercedb.OrderItems oi on o.ID = oi.OrderID";

    values = [];

    if (data.userId) {
      sql += " where u.id = ?";
      values.push(data.userId);
    }

    sqlConnection.executeQuery(sql, values, function (err, result) {
      cb(err, result);
    });
  },
  addOrder: function (cb, data) {
    let sql =
      "INSERT INTO OrderDetails (Total, UserID, OrderStatus, CreatedAt, UpdatedAt) VALUES (?, ?, now(), now())";

    let values = [];
    values.push(data.total);
    values.push(data.userId);
    sqlConnection.executeQuery(sql, values, function (err, result) {
      cb(err, result);
    });
  },
  updateOrder: function (cb, data) {
    let sql;

    let values = [];
    if (data.payment) {
      sql = "UPDATE OrderDetails SET OrderStatus=? UpdatedAt=now() WHERE ID=?";
    } else {
      sql =
        "UPDATE OrderDetails SET Total=? OrderStatus=? UpdatedAt=now() WHERE ID=?";
      values.push(data.total);
      values.push(1);
    }
    values.push(data.orderId);
    sqlConnection.executeQuery(sql, values, function (err, result) {
      cb(err, result);
    });
  },
  findOrderByUser: function (cb, data) {
    let sql =
      "SELECT ID as orderId, Total as total from OrderDetails o WHERE o.UserID = ? AND o.OrderStatus = 1";

    let values = [];
    values.push(data.userId);
    sqlConnection.executeQuery(sql, values, function (err, result) {
      cb(err, result);
    });
  },
  getOrderDetails: function (cb, data) {
    let sql =
      "SELECT od.ID as orderId, od.Total as total, p.ID as productId, p.Name as productName, p.Price as price, oi.Quantity as quantity FROM OrderDetails as od LEFT JOIN OrderItems as oi ON od.ID = oi.OrderID oi LEFT JOIN Products as p ON p.ID = oi.ProductID WHERE od.UserId=? AND od.OrderStatus=1";

    let values = [];
    values.push(data.userId);
    sqlConnection.executeQuery(sql, values, function (err, result) {
      cb(err, result);
    });
  },
};
