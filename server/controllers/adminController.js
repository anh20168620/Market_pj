const argon2 = require('argon2');
const User = require('../models/User.model')
const Admin = require('../models/Admin.model')


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

    }
}




module.exports = adminController