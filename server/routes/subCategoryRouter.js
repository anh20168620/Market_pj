const express = require('express');
const router = express.Router();

const subCategoryController = require('../controllers/subCategoryController')

// get subCategory
router.get('/get/:id', subCategoryController.get)

module.exports = router;