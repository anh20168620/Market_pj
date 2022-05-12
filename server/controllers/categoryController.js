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
    post: async (req, res) => { }
}

module.exports = category