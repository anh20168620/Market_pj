
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
            })

            if (chat.length !== 0) {
                res.status(200).json({ success: true, chat })
            } else {
                const newChat = new Chat({
                    users: [req.body.senderId, req.body.receiverId],
                    productId: req.body.productId

                })
                const saveChat = await newChat.save()
                res.status(200).json({ success: true, saveChat })
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
            }).populate('users', '-password')
            res.status(200).json({ success: true, chat })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })

        }
    }
}


module.exports = chatController