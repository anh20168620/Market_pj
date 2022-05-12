const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController')

// Get category
router.get('/get', categoryController.get)

// Add categoryController
router.post('/post', categoryController.post)


module.exports = router
