
const Chat = require('../models/Chat.model')


const chatController = {
    // new chat
    new: async (req, res) => {
        try {
            const chat = await Chat.find({
                productId: req.body.productId, $and: [
                    { users: { $elemMatch: { $eq: req.body.senderId } } },
                    { users: { $elemMatch: { $eq: req.body.receiverId } } }
                ]
            }).populate('users', '-password').populate('productId', 'image title price')
            if (chat.length !== 0) {
                res.status(200).json({ success: false, chat })
            } else {
                const newChat = new Chat({
                    users: [req.body.senderId, req.body.receiverId],
                    productId: req.body.productId
                })
                const saveChat = await newChat.save()
                const Chatt = await Chat.findById(saveChat._id).populate('users', '-password').populate('productId', 'image title price')
                res.status(200).json({ success: true, Chatt })
            }


        } catch (error) {
            res.status(500).json({ success: false, message: error.message })

        }

    },

    // get chat
    get: async (req, res) => {

        try {
            const chat = await Chat.find({
                users: { $in: [req.params.userId] }
            }).populate('users', '-password').populate('productId', 'image title price')
            res.status(200).json({ success: true, chat })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })

        }
    },

    // delete chat
    delete: async (req, res) => {
        const chatId = req.params.chatId
        try {
            const chatDelete = await Chat.findByIdAndDelete(chatId)
            res.status(200).json({ success: true, chatDelete })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })

        }
    },

    // notify chat

    notify: async (req, res) => {

    },


}


module.exports = chatController