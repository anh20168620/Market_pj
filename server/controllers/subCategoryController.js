const SubCategory = require('../models/SubCategory.model')



const subCategoryController = {
    get: async (req, res) => {
        try {
            const categoryId = req.params.id
            if (categoryId) {
                const subCategory = await SubCategory.find({ categoryId: categoryId })
                res.status(200).json({ success: true, subCategory })
            } else {
                res.status(200).json({ success: false })
            }
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    // update name subCategory
    updateName: async (req, res) => {
        const subCategoryId = req.params.id
        const newName = req.body.newName
        try {
            const subCategory = await SubCategory.findByIdAndUpdate(subCategoryId, { name: newName })
            res.status(200).json({ success: true, message: "Cập nhật thành công" })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    // add sub category

    add: async (req, res) => {
        const categoryId = req.body.categoryId
        const subCategoryName = req.body.subCategoryName

        try {
            const subCategory = await new SubCategory({
                name: subCategoryName,
                categoryId: categoryId
            })
            await subCategory.save()
            res.status(200).json({ success: true, message: "Thêm loại sản phẩm mới thành công" })

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    // delete subCategory

    delete: async (req, res) => {
        const subCategoryId = req.params.id
        try {
            await SubCategory.findByIdAndDelete(subCategoryId)
            res.status(200).json({ success: true })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

module.exports = subCategoryController