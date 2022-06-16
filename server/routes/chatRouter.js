const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chatController')

// new Chat

router.post('/new-chat', chatController.new)

// get chat of user
router.get('/get-chat/:userId', chatController.get)


// delete chat
router.delete('/delete-chat/:chatId', chatController.delete)

// set last message
router.post('/setLastMessage/:chatId', chatController.setLastMessage)

// set unseen chat
router.post('/unseen/:chatId/:userId', chatController.unseen)

// set seen chat
router.post('/seen/:chatId/:userId', chatController.seen)

module.exports = router
