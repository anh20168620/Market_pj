const fs = require('fs');
const User = require('../models/User.model')

const uploadController = {
    avatar: async (req, res) => {
        fs.rename(`public/avatar/${req.file.filename}`, `public/avatar/${req.file.originalname}`, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: err.message })
            } else {
                const user = await User.findById(req.params.id)
                user.avatar = req.file.originalname
                await user.save()
                return res.status(201).json({ success: true, message: 'Cập nhật ảnh thành công', user })
            }
        })
    },

    imageProduct: async (req, res) => {
        const files = req.files
        res.status(200).json({ success: true, files })
    }
}



module.exports = uploadController