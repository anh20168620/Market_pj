const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const uploadImageCategory = require('../middlewares/uploads/uploadImageCategory');

// Get categorys
router.get('/get', categoryController.get)


// Get category by Id
router.get('/get-by-id/:categoryId', categoryController.getById)


// Add categoryController
router.post('/add-category', categoryController.add)

// update image category

router.post('/update-image', uploadImageCategory.single('imgCategory'), categoryController.updateImg)


module.exports = router
