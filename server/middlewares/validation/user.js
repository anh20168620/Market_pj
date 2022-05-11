const { check, validationResult } = require('express-validator');
const User = require('../../models/User.model')

exports.validateUserRegister = [
    check('fullName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Tên là bắt buộc!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Tên phải nằm trong phạm vi 3 ký tự đến 20 ký tự! '),
    check('numberPhone')
        .not()
        .isEmpty()
        .withMessage('Số điện thoại là bắt buộc!')
        .matches(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/)
        .withMessage('Số điện thoại không hợp lệ!'),
    check('email')
        .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        .withMessage('Email không hợp lệ!')
        .isEmail()
        .withMessage('Email không hợp lệ!')
        .not()
        .isEmpty()
        .withMessage('Email là bắt buộc!')
        .normalizeEmail()
        .isLowercase()
        .withMessage('Email không hợp lệ!')
        .custom(async value => {
            await User.findOne({ email: value }).then(user => {
                if (user) {
                    throw new Error('Email đã tồn tại!')
                }
            })
        }),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Mật khẩu là bắt buộc!')
        .isLength({ min: 6, max: 20 })
        .withMessage('Mật khẩu phải từ 6 đến 20 ký tự'),
    check('confirmPassword')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Nhập lại mật khẩu là bắt buộc!')
        .custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error('Mật khẩu nhập lại không đúng!');
            }
            return true;
        })
];

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array()
    if (!result.length) return next();

    const error = result[0].msg;
    res.status(401).json({ success: false, message: error });
}

exports.validateUserLogin = [
    check('email')
        .trim()
        .not().
        isEmpty()
        .withMessage('Email / mật khẩu là bắt buộc')
        .isEmail()
        .withMessage('Email không hợp lệ!'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Email / mật khẩu là bắt buộc')
]

exports.validateUserUpdate = [
    check('fullName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Tên là bắt buộc!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Tên phải nằm trong phạm vi 3 ký tự đến 20 ký tự! '),
    check('numberPhone')
        .not()
        .isEmpty()
        .withMessage('Số điện thoại là bắt buộc!')
        .matches(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/)
        .withMessage('Số điện thoại không hợp lệ!'),
]