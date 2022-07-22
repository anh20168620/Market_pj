const { check, validationResult } = require('express-validator');
const fs = require('fs');

exports.validatePostProduct = [
    check('categoryId')
        .not()
        .isEmpty()
        .withMessage('Vui lòng chọn danh mục tin đăng!')
        .custom((value, { req }) => {
            if (!value) {
                const images = req.body.image
                for (const image of images) {
                    fs.unlinkSync(`public/image_product/${image}`)
                }

            }
            return true;
        })
    ,
    check('subCategoryId')
        .not()
        .isEmpty()
        .withMessage('Vui lòng chọn loại sản phẩm!')
        .custom((value, { req }) => {
            if (!value) {
                const images = req.body.image
                for (const image of images) {
                    fs.unlinkSync(`public/image_product/${image}`)
                }

            }
            return true;
        }),
    check('title')
        .not()
        .isEmpty()
        .withMessage('Vui lòng nhập tiêu đề!')
        .isLength({ min: 10, max: 50 })
        .withMessage('Tiêu đề từ 10-50 ký tự')
        .custom((value, { req }) => {
            if (!value || value.length < 10 || value.length > 50) {
                const images = req.body.image
                for (const image of images) {
                    fs.unlinkSync(`public/image_product/${image}`)
                }

            }
            return true;
        }),
    check('price')
        .not()
        .isEmpty()
        .withMessage('Vui lòng nhập giá sản phẩm!')
        .custom((value, { req }) => {
            if (!value) {
                const images = req.body.image
                for (const image of images) {
                    fs.unlinkSync(`public/image_product/${image}`)
                }

            }
            return true;
        }),
    check('brand')
        .not()
        .isEmpty()
        .withMessage('Vui lòng nhập hãng(thương hiệu,xuất xứ)!')
        .custom((value, { req }) => {
            if (!value) {
                const images = req.body.image
                for (const image of images) {
                    fs.unlinkSync(`public/image_product/${image}`)
                }

            }
            return true;
        }),
    check('description')
        .not()
        .isEmpty()
        .withMessage('Vui lòng nhập mô tả sản phẩm!')
        .isLength({ min: 10, max: 1500 })
        .withMessage('Nhập mô tả sản phẩm từ 10-1500 ký tự').
        custom((value, { req }) => {
            if (!value || value.length < 10 || value.length > 1500) {
                const images = req.body.image
                for (const image of images) {
                    fs.unlinkSync(`public/image_product/${image}`)
                }

            }
            return true;
        }),
    check('address')
        .not()
        .isEmpty()
        .withMessage('Vui lòng nhập địa chỉ!')
        .custom((value, { req }) => {
            if (!value) {
                const images = req.body.image
                for (const image of images) {
                    fs.unlinkSync(`public/image_product/${image}`)
                }

            }
            return true;
        }),
    check('typeOfSell')
        .not()
        .isEmpty()
        .withMessage('Vui lòng nhập dạng bán hàng!')
        .custom((value, { req }) => {
            if (!value) {
                const images = req.body.image
                for (const image of images) {
                    fs.unlinkSync(`public/image_product/${image}`)
                }

            }
            return true;
        }),

]

exports.postProductValidation = (req, res, next) => {
    const result = validationResult(req).array()
    if (!result.length) return next();

    const error = result[0].msg;
    res.status(401).json({ success: false, message: error });
}