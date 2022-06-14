const argon2 = require('argon2');
const User = require('../models/User.model')
const Admin = require('../models/Admin.model');
const Notify = require('../models/Notify.model');


const adminController = {
    // admin create
    create: async (req, res) => {

        const hasdedPassword = await argon2.hash(req.body.password)
        const newAdmin = new Admin({
            email: req.body.email,
            password: hasdedPassword
        })
        await newAdmin.save()
        res.status(200).json({ success: true, newAdmin })
    },

    // admin login 
    login: async (req, res) => {
        try {
            const admin = await Admin.findOne({ email: req.body.email })
            if (admin) {
                const passwordValid = await argon2.verify(admin.password, req.body.password)
                if (!passwordValid) return res.status(401).json({ success: false, message: 'Email/ mật khẩu không chính xác!' })

                res.status(200).json({ success: true, message: 'Đăng nhập quản trị viên thành công', admin })
            } else {
                res.status(200).json({ success: false, message: 'Email/ mật khẩu không chính xác!' })
            }

        } catch (error) {
            res.status(400).json({ success: false, message: error.message })
        }

    },

    // admin send notification
    sendNotification: async (req, res) => {
        const userId = req.params.userId
        const title = req.body.title
        const content = req.body.content

        try {
            if (userId) {
                const notify = new Notify({ userId, title, content })
                await notify.save()
                res.status(200).json({ success: true, message: "Thông báo gửi thành công" })
            }

        } catch (error) {
            res.status(400).json({ success: false, message: error.message })
        }
    },
    // admin send notification for all users
    sendNotifications: async (req, res) => {
        const title = req.body.title
        const content = req.body.content
        try {
            const users = await User.find({ isActive: true })
            users.map((user) => {
                return new Notify({
                    userId: user._id, title: title, content: content
                }).save()
            })
            res.status(200).json({ success: true, message: "Thông báo gửi thành công" })
        } catch (error) {
            res.status(400).json({ success: false, message: error.message })

        }
    }
}




module.exports = adminController