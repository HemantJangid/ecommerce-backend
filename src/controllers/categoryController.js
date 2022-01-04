const Category = require('../models/category');

module.exports = {
    listCategories: function(req, res) {
        Category.listCategories(function(err, result) {

            if(err) {
                return res.status(500).send({
                    error: err,
                    message: "Error in fetching data",
                    categories: result,
                    success: true,
                });
            }

            return res.status(200).send({
                message: "Succesfully fetched all categories",
                categories: result,
                success: true,
            });
        })
    }
}