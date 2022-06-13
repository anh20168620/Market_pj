const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')

// create admin
router.post('/create', adminController.create)



// admin login
router.post('/login', adminController.login)

// admin sen notification
router.post('/send-notification/:userId', adminController.sendNotification)



module.exports = router