const User = require('../models/User.model')
const Admin = require('../models/Admin.model')
const argon2 = require('argon2');
const TokenUser = require('../models/Token_user.model');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const Notify = require('../models/Notify.model');

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
            const user = await newUser.save()

            const token = await new TokenUser({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex'),
            }).save()
            const url = `${process.env.BASE_URL}user/${user._id}/verify/${token.token}`
            await sendEmail(user.email, "Xác thực email", url);


            res.status(200).json({ success: true, message: "Một email được gửi đến tài khoản của bạn, vui lòng xác minh" })

        } catch (error) {
            res.status(400).json({ success: false, message: error.message })
        }
    },

    // LOGIN
    login: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            const admin = await User.findOne({ email: req.body.email })
            if (!user && !admin) return res.status(404).json({ success: false, message: 'Email/ mật khẩu không chính xác!' })

            // user found
            const passwordValid = await argon2.verify(user.password, req.body.password)
            if (!passwordValid) return res.status(401).json({ success: false, message: 'Email/ mật khẩu không chính xác!' })
            // verify active
            if (!user.isActive) {
                let token = await TokenUser.findOne({ userId: user._id });
                if (!token) {
                    token = await new TokenUser({
                        userId: user._id,
                        token: crypto.randomBytes(32).toString('hex')
                    }).save()
                    const url = `${process.env.BASE_URL}user/${user._id}/verify/${token.token}`
                    await sendEmail(user.email, "Xác thực email", url);
                }
                res.status(400).json({ success: false, message: "Một email được gửi đến tài khoản của bạn, vui lòng xác minh" })

            }

            res.status(200).json({ success: true, message: 'Đăng nhập thành công', user })
        } catch (error) {
            res.status(400).json({ success: false, message: error.message })
        }
    },

    // UPDATE
    update: async (req, res) => {
        try {
            const user = await User.findById(req.body.userId);

            if (user) {
                user.fullName = req.body.fullName || user.fullName;
                user.numberPhone = req.body.numberPhone || user.numberPhone;
                user.birthday = req.body.birthday || user.birthday;
                user.address = req.body.address || user.address;

                const updateUser = await user.save();
                res.status(200).json({
                    success: true,
                    user,
                    message: "Cập nhật thông tin thành công"
                })

            }
            else {
                res.status(404).json({ success: false, message: 'Người dùng không tìm thấy' })
            }
        } catch (error) {
            res.status(404).json({ success: false, message: error.message })
        }
    },

    // verify email
    verifyEmail: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.id })
            if (!user) return res.status(400).json({ message: 'Link không tồn tại' })

            const token = await TokenUser.findOne({
                userId: user._id,
                token: req.params.token
            })
            if (!token) return res.status(400).json({ message: 'Link không tồn tại' })

            await User.updateOne({ _id: user._id }, { isActive: true })

            await token.remove()

            res.status(200).json({ success: true, message: 'Email xác thực thành công' })

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    // change password
    changePassword: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.id })
            const passwordValid = await argon2.verify(user.password, req.body.password)
            if (!passwordValid) return res.status(400).json({ success: false, message: "Mật khẩu nhập vào không đúng" })
            else {
                const newHasdedPassword = await argon2.hash(req.body.newPassword)
                user.password = newHasdedPassword
                await user.save()
                res.status(200).json({ success: true, message: "Đổi mật khẩu thành công" })
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    // Rating
    rating: async (req, res) => {
        try {
            const rating = req.body.value;
            let user = await User.findById(req.params.id)
            for (let i = 0; i < user.rate.length; i++) {
                if (!user.rate[0].userId.includes(req.body.userId) && !user.rate[1].userId.includes(req.body.userId) && !user.rate[2].userId.includes(req.body.userId) && !user.rate[3].userId.includes(req.body.userId) && !user.rate[4].userId.includes(req.body.userId)) {
                    user.rate[rating - 1].quantity += 1
                    user.rate[rating - 1].userId.push(req.body.userId)
                    user.markModified('rate')
                    await user.save();
                    return res.status(200).json({ success: true, data: user.rate })

                } else if (user.rate[0].userId.includes(req.body.userId)) {
                    user.rate[0].quantity -= 1,
                        newUserId = await user.rate[0].userId.filter(userId => userId !== req.body.userId)
                    user.rate[0].userId = newUserId

                    user.rate[rating - 1].quantity += 1
                    user.rate[rating - 1].userId.push(req.body.userId)
                    await user.markModified('rate')
                    await user.save();
                    return res.status(200).json({ success: true, data: user.rate })

                } else if (user.rate[1].userId.includes(req.body.userId)) {
                    user.rate[1].quantity -= 1,
                        newUserId = await user.rate[1].userId.filter(userId => userId !== req.body.userId)
                    user.rate[1].userId = newUserId

                    user.rate[rating - 1].quantity += 1
                    user.rate[rating - 1].userId.push(req.body.userId)
                    await user.markModified('rate')
                    await user.save();
                    return res.status(200).json({ success: true, data: user.rate })

                } else if (user.rate[2].userId.includes(req.body.userId)) {
                    user.rate[2].quantity -= 1,
                        newUserId = await user.rate[2].userId.filter(userId => userId !== req.body.userId)
                    user.rate[2].userId = newUserId

                    user.rate[rating - 1].quantity += 1
                    user.rate[rating - 1].userId.push(req.body.userId)
                    await user.markModified('rate')
                    await user.save();
                    return res.status(200).json({ success: true, data: user.rate })

                } else if (user.rate[3].userId.includes(req.body.userId)) {
                    user.rate[3].quantity -= 1,
                        newUserId = await user.rate[3].userId.filter(userId => userId !== req.body.userId)
                    user.rate[3].userId = newUserId

                    user.rate[rating - 1].quantity += 1
                    user.rate[rating - 1].userId.push(req.body.userId)
                    await user.markModified('rate')
                    await user.save();
                    return res.status(200).json({ success: true, data: user.rate })

                } else if (user.rate[4].userId.includes(req.body.userId)) {
                    user.rate[4].quantity -= 1,
                        newUserId = await user.rate[4].userId.filter(userId => userId !== req.body.userId)
                    user.rate[4].userId = newUserId

                    user.rate[rating - 1].quantity += 1
                    user.rate[rating - 1].userId.push(req.body.userId)
                    await user.markModified('rate')
                    await user.save();
                    return res.status(200).json({ success: true, data: user.rate })

                }
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }

    },

    // get total user
    total: async (req, res) => {
        const total = await User.find().countDocuments()
        res.status(200).json({ success: true, total })
    },

    // get notify user
    notify: async (req, res) => {
        const userId = req.params.userId
        try {
            if (userId) {
                const notify = await Notify.find({ userId: userId }).sort({ 'createdAt': -1 })
                const total = await Notify.find({ userId: userId, seen: false }).countDocuments()
                res.status(200).json({ success: true, notify, total })
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    // set status seen notify
    notifySeen: async (req, res) => {
        const userId = req.params.userId
        const notifyId = req.params.notifyId
        try {
            const notify = await Notify.findById(notifyId)
            if (notify) {
                notify.seen = true
                await notify.save()
                const notifyUpdate = await Notify.find({ userId: userId }).sort({ 'createdAt': -1 })
                const total = await Notify.find({ userId: userId, seen: false }).countDocuments()

                res.status(200).json({ success: true, notifyUpdate, total })
            }

        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })

        }
    },

    // delete notify
    deleteNotify: async (req, res) => {
        const userId = req.params.userId
        const notifyId = req.params.notifyId
        try {
            if (notifyId && userId) {
                await Notify.findByIdAndDelete(notifyId)
                const notify = await Notify.find({ userId: userId }).sort({ 'createdAt': -1 })
                const total = await Notify.find({ userId: userId, seen: false }).countDocuments()

                res.status(200).json({ success: true, notify, total })
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })

        }

    }




}

module.exports = userController;