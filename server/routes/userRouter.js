const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')
const { validateUserRegister, userValidation, validateUserLogin, validateUserUpdate } = require('../middlewares/validation/user')
const { validatePassword } = require('../middlewares/validation/password')

// user register
router.post('/register', validateUserRegister, userValidation, userController.register)

// user login
router.post('/login', validateUserLogin, userValidation, userController.login)

// user update-profiler
router.patch('/update-profile', validateUserUpdate, userValidation, userController.update)

// user verify email
router.get('/:id/verify/:token', userController.verifyEmail)

// user change password
router.post('/change-password/:id', validatePassword, userValidation, userController.changePassword)

// user related
router.post('/rating/:id', userController.rating)

// get total user
router.get('/total', userController.total)

// get notify user
router.get('/notify/:userId', userController.notify)

// set status seen notify
router.post('/notify-seen/:notifyId/:userId', userController.notifySeen)


// delete notify user
router.post('/delete-notify/:userId', userController.deleteNotify)


module.exports = router