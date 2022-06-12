const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chatController')

// new Chat

router.post('/new-chat', chatController.new)

// get chat of user

router.get('/get-chat/:userId', chatController.get)

// delete chat

router.delete('/delete-chat/:chatId', chatController.delete)



module.exports = router
