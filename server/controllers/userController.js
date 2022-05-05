const User = require('../models/User.model')
const argon2 = require('argon2');

const userController = {
    // REGISTER
    register: async (req, res) => {
        try {
            const hasdedPassword = await argon2.hash(req.body.password)
            const newUser = new User({
                fullName: req.body.fullName,
                numberPhone: req.body.numberPhone,
                email: req.body.email,
                password: hasdedPassword
            })
            await newUser.save()
            res.status(200).json({ success: true, data: newUser })

        } catch (error) {
            res.status(400).json({ success: false, message: error.message })
        }
    },

    // LOGIN
    login: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) return res.status(404).json({ success: false, message: 'Người dùng không tìm thấy với email này!' })

            // user found
            const passwordValid = await argon2.verify(user.password, req.body.password)
            if (!passwordValid) return res.status(401).json({ success: false, message: 'Email/ mật khẩu không chính xác' })

            res.status(200).json({ success: true, user })
        } catch (error) {
            res.status(400).json({ success: false, message: error.message })
        }
    }
}

module.exports = userController;