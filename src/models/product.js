const sqlConnection = require('../services/sqlConnection');

module.exports = {
    listProducts: function (data, cb) {
        let sql = "SELECT ID as productId, Name as name, Description as description, Price as price, VendorId as vendorId, CategoryId as categoryId FROM Products";

        if (data.categoryId) {
            sql += ` WHERE CategoryID = ${data.categoryId}`
        } else if (data.minPrice) {
            sql += ` WHERE Price >= ${data.minPrice}`
        } else if (data.maxPrice) {
            sql += ` WHERE Price <= ${data.maxPrice}`
        }


        sqlConnection.executeQuery(sql, '', function(err, result) {
            cb(err, result);
        })
    }
}