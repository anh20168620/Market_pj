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
            res.json(newUser)

        } catch (error) {
            res.status(400).json({ success: false, message: error.message })
        }
    },

    // LOGIN
    login: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) return res.json({ success: false, message: 'user not found with the given email' })

            // user found
            const passwordValid = await argon2.verify(user.password, req.body.password)
            if (!passwordValid) return res.json({ success: false, message: 'email/ password does not match' })

            res.json({ success: true, user })
        } catch (error) {

        }
    }
}

module.exports = userController