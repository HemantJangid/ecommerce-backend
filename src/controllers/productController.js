const Product = require('../models/product');

module.exports = {
    listProducts: function(req, res) {
        Product.listProducts(req.body, function(err, result) {

            if(err) {
                return res.status(500).send({
                    error: err,
                    message: "Error in fetching data",
                    products: result,
                    success: true,
                });
            }

            return res.status(200).send({
                message: "Succesfully fetched all products",
                products: result,
                success: true,
            });
        })
    },
    addProduct: function (req, res) {
        let data = req.body;
        if(data.name && data.price && data.description && data.categoryId && data.vendorId) {
            Product.addProduct(data, function(err, result) {
                if(err) {
                    return res.status(500).send({
                        error: err,
                        message: "Error in adding data",
                        success: true,
                    });
                }
                return res.status(200).send({
                    message: "Product added successfully",
                    product: result,
                    success: true,
                });
            })
        }
    }
}