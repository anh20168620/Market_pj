const fs = require('fs');
const User = require('../models/User.model')

const uploadController = {
    avatar: async (req, res) => {
        fs.rename(`public/avatar/${req.file.filename}`, `public/avatar/${req.file.originalname}`, async (err) => {
            if (err) {
                res.status(500).json({ success: false, message: err.message })
            } else {
                const user = await User.findById(req.params.id)
                user.avatar = req.file.originalname
                await user.save()
                res.status(201).json({ success: true, message: 'Cập nhật ảnh thành công', user })
            }
        })
    }
}


module.exports = uploadController