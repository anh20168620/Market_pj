const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')
const { validateUserRegister, userValidation, validateUserLogin } = require('../middlewares/validation/user')


// user register
router.post('/register', validateUserRegister, userValidation, userController.register)

// user login
router.post('/login', validateUserLogin, userValidation, userController.login)

module.exports = router