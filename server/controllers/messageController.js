const Message = require('../models/Message.model')


const messageController = {
    // add message
    add: async (req, res) => {
        const newMessage = new Message(req.body)

        try {
            const save = await newMessage.save()
            const saveMessage = await Message.findById(save._id).populate('sender', 'avatar fullName')
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
            }).populate('sender', 'avatar fullName')
            res.status(200).json({ success: true, message })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })

        }
    },

    // delete message when chat deleted

    delete: async (req, res) => {
        const chatId = req.params.chatId
        try {
            await Message.remove({ chatId: chatId })
            res.status(200).json({ success: true, message: "Tin nhắn xóa thành công" })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    }

}

module.exports = messageController
