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
    }
}

module.exports = subCategoryController