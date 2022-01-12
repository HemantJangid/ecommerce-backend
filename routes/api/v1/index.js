const express = require("express");
const categoryController = require("../../../src/controllers/categoryController");
const orderController = require("../../../src/controllers/orderController");
const productController = require("../../../src/controllers/productController");
const userController = require("../../../src/controllers/userController");

const router = express.Router();

router.post("/category/all", categoryController.listCategories);
router.post("/product/all", productController.listProducts);
router.post(
  "/product/add",
  userController.isAuthenticated,
  productController.addProduct
);
router.post("/order/all", orderController.listOrders);
router.post("/order/details", orderController.getOrderDetails);
router.post("/user/signup", userController.securedSignup);
router.post("/user/login", userController.securedLogin);

module.exports = router;
