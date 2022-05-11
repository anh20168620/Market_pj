const { check, validationResult } = require('express-validator');
const User = require('../../models/User.model')


exports.validatePassword = [
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Mật khẩu là bắt buộc!')
        .isLength({ min: 6, max: 20 })
        .withMessage('Mật khẩu phải từ 6 đến 20 ký tự'),
]