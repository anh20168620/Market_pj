const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController')

// add message
router.post('/add-message', messageController.add)

// get message
router.get('/get-message/:chatId', messageController.get)

module.exports = router
