const sqlConnection = require('../services/sqlConnection');

module.exports = {
    listOrders: function (cb, data) {
        let sql = "select * from ecommercedb.Users u inner join ecommercedb.OrderDetails o on u.ID = o.UserID inner join ecommercedb.OrderItems oi on o.ID = oi.OrderID";

        values = []

        if (data.userId) {
            sql += ' where u.id = ?';
            values.push(data.userId);
        }

        sqlConnection.executeQuery(sql, values, function(err, result) {
            cb(err, result);
        })
    }
}