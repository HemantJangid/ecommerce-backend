const express = require("express");
const categoryController = require("../../../src/controllers/categoryController");

const router = express.Router();

router.post('/api/v1/category/all', categoryController.listCategories);

module.exports = router;