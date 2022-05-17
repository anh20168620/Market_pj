const Product = require('../models/Product.model')


const productController = {

    // upload image product
    imageProduct: async (req, res) => {
        const files = req.files
        res.status(200).json({ success: true, files })
    },


    // upload product(create post product)
    post: async (req, res) => {
        try {
            const newPost = await Product({
                title: req.body.title,
                price: req.body.price,
                insurance: req.body.insurance,
                brand: req.body.brand,
                description: req.body.description,
                address: req.body.address,
                status: req.body.status,
                typeOfSell: req.body.typeOfSell,
                image: req.body.image,
                userId: req.body.userId,
                categoryId: req.body.categoryId,
                subCategoryId: req.body.subCategoryId
            })
            if (newPost) {
                await newPost.save();
                res.status(201).json({ success: true, message: "Đăng tin thành công, đợi xét duyệt tin của bạn" })
            }


        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }

    },
    // get product by time
    get: async (req, res, next) => {
        try {
            const total = await Product.find().countDocuments()
            const pageNumber = Number(req.query.pageNumber);
            const pageSize = Number(req.query.pageSize);

            const data = await Product.find().sort({ 'createdAt': -1 }).populate('userId categoryId subCategoryId', 'fullName-_id name-_id name-_id')
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .lean()

            res.status(200).json({ success: true, data, total })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    },

    // get product details when click
    getDetail: async (req, res) => {
        try {
            const productId = req.query.productId
            const product = await Product.findById(productId).populate('userId subCategoryId', 'fullName numberPhone avatar name')
            if (product) {
                res.status(200).json({ success: true, product })
            } else {
                res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" })
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })

        }
    }


}


module.exports = productController