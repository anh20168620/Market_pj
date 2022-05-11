const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')
const { validateUserRegister, userValidation, validateUserLogin, validateUserUpdate } = require('../middlewares/validation/user')


// user register
router.post('/register', validateUserRegister, userValidation, userController.register)

// user login
router.post('/login', validateUserLogin, userValidation, userController.login)

// user update-profiler
router.patch('/update-profile', validateUserUpdate, userValidation, userController.update)

// user verify email
router.get('/:id/verify/:token', userController.verifyEmail)



module.exports = router