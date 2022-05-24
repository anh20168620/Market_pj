const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/productController')
const uploadImageProduct = require('../middlewares/uploads/uploadImageProduct')
const { validatePostProduct, postProductValidation } = require('../middlewares/validation/postProduct')



// upload image product
router.post('/image-product/:id', (req, res, next) => {
    uploadImageProduct(req, res, function (err) {

        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.json({ success: false, message: "Chọn ảnh dưới 6MB" })
            }
            if (err.code === 'LIMIT_FILE_COUNT') {
                return res.json({ success: false, message: "Chỉ chọn từ 1 đến 3 ảnh" })
            }

        } else if (err) {
            return res.send(err)
        } else {
            next()
        }

    })
}, productController.imageProduct)


// upload  product
router.post('/post', validatePostProduct, postProductValidation, productController.post)


// get product
router.get('/get', productController.get)

// get product detail
router.get('/get-detail', productController.getDetail)

// get product by category
router.get('/product-by-category', productController.productByCategory)

// get your product display
router.get('/your-product-display', productController.yourProductDisplay)

// get your product hidden
router.get('/your-product-hidden', productController.yourProductHidden)

// hidden your product
router.patch('/hidden-your-product', productController.hiddenYourProduct)

// display your product
router.patch('/display-your-product', productController.displayYourProduct)



module.exports = router