const sqlConnection = require('../services/sqlConnection');

module.exports = {
    listCategories: function (cb) {
        let sql = "SELECT ID as categoryId, Name as name FROM Categories";

        sqlConnection.executeQuery(sql, '', function(err, result) {
            cb(err, result);
        })
    }
}