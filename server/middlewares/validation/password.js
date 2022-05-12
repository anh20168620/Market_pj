const { check } = require('express-validator');

exports.validatePassword = [
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Mật khẩu là bắt buộc!')
        .isLength({ min: 6, max: 20 })
        .withMessage('Mật khẩu phải từ 6 đến 20 ký tự'),
    check('newPassword')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Mật khẩu mới là bắt buộc!')
        .isLength({ min: 6, max: 20 })
        .withMessage('Mật khẩu mới phải từ 6 đến 20 ký tự')
        .custom((value, { req }) => {
            if (value === req.body.password) {
                throw new Error('Mật khẩu mới phải khác mật khẩu cữ')
            }
            return true;
        }),
    check('confirmNewPassword')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Nhập lại mật khẩu mới là bắt buộc!')
        .custom((value, { req }) => {
            if (value != req.body.newPassword) {
                throw new Error('Mật khẩu mới nhập lại không đúng!');
            }
            return true;
        })
]