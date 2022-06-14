const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')

// create admin
router.post('/create', adminController.create)



// admin login
router.post('/login', adminController.login)

// admin send notification
router.post('/send-notification/:userId', adminController.sendNotification)

// admin send notification for all users
router.post('/send-notifications', adminController.sendNotifications)


module.exports = router