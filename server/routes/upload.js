const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController')
const uploadAvatar = require('../middlewares/uploads/uploadAvatar')
const uploadImageProduct = require('../middlewares/uploads/uploadImageProduct')

// upload avatar
router.post('/avatar/:id', uploadAvatar.single('avatar'), uploadController.avatar)

// upload image product
router.post('/image-product/:id', uploadImageProduct.array('imageProduct', 6), uploadController.imageProduct)

module.exports = router;