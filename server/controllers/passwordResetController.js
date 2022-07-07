const User = require('../models/User.model')
const argon2 = require('argon2');
const TokenUser = require('../models/Token_user.model');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const Joi = require('joi');
const MailForgotPasswordTemplate = require('../utils/mailForgotPassword.template');

// send link reset password
const sendLinkReset = async (req, res) => {
    try {
        const emailSchema = Joi.object({
            email: Joi.string().email().required().label("Email"),
        })
        const { error } = emailSchema.validate(req.body)
        if (error)
            return res.status(400).json({ success: false, message: "Email không hợp lệ" })

        let user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(404).json({ success: false, message: "Không tìm thấy người dùng với email này" })

        let token = await TokenUser.findOne({ userId: user._id })
        if (!token) {
            token = await new TokenUser({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const url = `${process.env.BASE_URL}password-reset/${user._id}/${token.token}`
        await sendEmail(user.email, "Đặt lại mật khẩu", MailForgotPasswordTemplate(url));

        res.status(200).json({ success: true, message: "Link đặt lại mật khẩu đã được gửi tới email của bạn", url })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// verify url
const verifyUrl = async (req, res) => {
    try {
        const user = User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).json({ success: false, message: "Link không tồn tại" })

        const token = TokenUser.findOne({
            userId: user._id,
            token: req.params.token
        })
        if (!token) return res.status(400).json({ success: false, message: "Link không tồn tại" })

        res.status(200).json({ success: true, message: "Link hợp lệ" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
// reset password

const resetPassword = async (req, res) => {
    try {
        const passwordSchema = Joi.object({
            password: Joi.string().min(6).max(20).required(),
        })
        const { error } = passwordSchema.validate(req.body)
        if (error)
            return res.status(400).json({ success: false, message: error.details[0].message })


        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).json({ success: false, message: "Link không tồn tại" })

        const token = TokenUser.findOne({
            userId: user._id,
            token: req.params.token
        })
        if (!token) return res.status(400).json({ success: false, message: "Link không tồn tại" })

        if (!user.isActive) user.isActive = true

        const hasdedPassword = await argon2.hash(req.body.password)

        user.password = hasdedPassword;
        await user.save();
        await token.deleteOne();

        res.status(200).json({ success: true, message: "Đặt lại mật khẩu thành công" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { sendLinkReset, verifyUrl, resetPassword };
