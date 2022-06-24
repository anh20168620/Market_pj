const fs = require('fs');
const Category = require('../models/Category.model')

const category = {
    // get category
    get: async (req, res) => {
        try {
            const categorys = await Category.find()
            return res.status(200).json({ success: true, categorys });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    add: async (req, res) => {

    },

    getById: async (req, res) => {
        const categoryId = req.params.categoryId
        try {
            const category = await Category.findById(categoryId)
            res.status(200).json({ success: true, category: category })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    // update img category
    updateImg: async (req, res) => {
        console.log(req.file);

        // validate:file type + file size
        const fileTypeRegex = /(\.jpg|\.jpeg|\.png)$/i;
        const maxFileSize = 2000000;

        if (!fileTypeRegex.test(req.file.originalname)) {
            res.status(400).json({ success: false, message: "Chỉ cho phép JPG, JPGE và PNG" })
            fs.unlinkSync(req.file.path)
        } else if (req.file.size > maxFileSize) {
            res.status(400).json({ success: false, message: "Ảnh tối đa 2MB" })
            fs.unlinkSync(req.file.path)
        } else {
            // rename file
            const filenameParts = req.file.originalname.split('.')
            const fileType = filenameParts[filenameParts.length - 1]
            const filename = `${req.file.filename}.${fileType}`

            fs.renameSync(req.file.path, `public/image_category/${filename}`)

            res.status(200).json({ success: true, imageUrl: `/${filename}` })
        }
    }
}

module.exports = category



