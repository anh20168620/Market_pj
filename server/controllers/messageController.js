const Message = require('../models/Message.model')


const messageController = {
    // add message
    add: async (req, res) => {
        const newMessage = new Message(req.body)

        try {
            const saveMessage = await newMessage.save()
            res.status(200).json({ success: true, saveMessage })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })

        }
    },

    // get message
    get: async (req, res) => {
        try {
            const message = await Message.find({
                chatId: req.params.chatId
            })
            res.status(200).json({ success: true, message })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })

        }
    }

}

module.exports = messageController
