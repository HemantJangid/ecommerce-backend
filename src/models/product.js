const sqlConnection = require('../services/sqlConnection');

module.exports = {
    listProducts: function (data, cb) {
        let sql = "SELECT ID as productId, Name as name, Description as description, Price as price, VendorId as vendorId, CategoryId as categoryId FROM Products";

        var values = [];

        if (data.categoryId) {
            sql += ` WHERE CategoryID = ?`;
            values.push(data.categoryId);
        } else if (data.minPrice) {
            sql += ` WHERE Price >= ?`;
            values.push(data.minPrice);
        } else if (data.maxPrice) {
            sql += ` WHERE Price <= ?`;
            values.push(data.maxPrice);
        }


        sqlConnection.executeQuery(sql, values, function(err, result) {
            cb(err, result);
        })
    },
    addProduct: function (data, cb) {
        var sql = `INSERT INTO Products (Name, Price, Description, categoryId, vendorId, createdAt, updatedAt) Values (? , ? , ? , ? , ? , now(), now())`;
        var values = [];
        values.push(data.name);
        values.push(data.price);
        values.push(data.description);
        values.push(data.categoryId);
        values.push(data.vendorId);
        sqlConnection.executeQuery(sql, values, function(err, result) {
            cb(err, result);
        });
    }
}