const { check, validationResult } = require('express-validator');
const User = require('../../models/User.model')

exports.validateUserRegister = [
    check('fullName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be within 3 characters to 20 characters!'),
    check('numberPhone')
        .not()
        .isEmpty()
        .withMessage('Phone is required!')
        .matches(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/)
        .withMessage('Phone is not valid!'),
    check('email')
        .normalizeEmail()
        .isEmail()
        .withMessage('Invalid email!')
        .custom(async value => {
            await User.findOne({ email: value }).then(user => {
                if (user) {
                    throw new Error('Email already in use!')
                }
            })
        }),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is empty!')
        .isLength({ min: 6, max: 20 })
        .withMessage('Password must be 6 to 20 characters long!'),
    check('confirmPassword')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Confirm Password is required!')
        .custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error('Password does not match!');
            }
            return true;
        })
];

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array()
    if (!result.length) return next();

    const error = result[0].msg;
    res.json({ success: false, message: error });
}

exports.validateUserLogin = [
    check('email')
        .trim()
        .not().
        isEmpty()
        .withMessage('email / password is required')
        .isEmail()
        .withMessage('email invalid!'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('email / password is required')
]