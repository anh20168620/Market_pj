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
        const categoryId = req.params.categoryId

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
            const category = await Category.findByIdAndUpdate(categoryId, { image: filename })

            res.status(200).json({ success: true, imageUrl: `/${filename}`, message: `Thay đổi ảnh danh mục thành công` })
        }
    },

    // update name category
    updateName: async (req, res) => {
        const categoryId = req.params.categoryId
        const newName = req.body.nameCategory

        try {
            const category = await Category.findByIdAndUpdate(categoryId, { name: newName })
            res.status(200).json({ success: true, category: category, message: "Đổi tên danh mục thành công" })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    // add new image category

    addNewImage: async (req, res) => {
        try {
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

                res.status(200).json({ success: true, imageUrl: `${filename}` })
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    // add category
    add: async (req, res) => {
        const image = req.body.image
        const name = req.body.name

        try {
            const newCategory = await new Category({
                image: image,
                name: name
            })
            await newCategory.save()
            res.status(200).json({ success: true, message: "Thêm danh mục thành công !" })

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = category



