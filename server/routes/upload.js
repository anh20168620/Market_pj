const express = require('express');
const multer = require('multer');
const router = express.Router();
const uploadController = require('../controllers/uploadController')
const uploadAvatar = require('../middlewares/uploads/uploadAvatar')
const uploadImageProduct = require('../middlewares/uploads/uploadImageProduct')

// upload avatar
router.post('/avatar/:id', uploadAvatar.single('avatar'), uploadController.avatar)

// upload image product
router.post('/image-product/:id', (req, res, next) => {
    uploadImageProduct(req, res, function (err) {

        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.json({ success: false, message: "Tệp quá lớn" })
            }
            if (err.code === 'LIMIT_FILE_COUNT') {
                return res.json({ success: false, message: "Chỉ chọn từ 1 đến 3 ảnh" })
            }
            if (err.code == undefined) {
                return res.json({ success: false, message: "Chỉ chọn tệp png, jpeg, jpg" })
            }
        } else if (err) {
            return res.send(err)
        } else {
            next()
        }

    })
}, uploadController.imageProduct)


module.exports = router;