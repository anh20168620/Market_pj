const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const uploadImageCategory = require('../middlewares/uploads/uploadImageCategory');

// Get categorys
router.get('/get', categoryController.get)


// Get category by Id
router.get('/get-by-id/:categoryId', categoryController.getById)


// update name category
router.post('/updateName/:categoryId', categoryController.updateName)


// update image category
router.post('/update-image/:categoryId', uploadImageCategory.single('imgCategory'), categoryController.updateImg)

// add new image category
router.post('/add-new-image-category', uploadImageCategory.single('imgCategory'), categoryController.addNewImage)


// Add categoryController
router.post('/add-category', categoryController.add)


module.exports = router
