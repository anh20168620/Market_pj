const Product = require('../models/Product.model')
const Category = require('../models/Category.model')


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
    },

    // get product by category
    productByCategory: async (req, res) => {
        try {

            const pageNumber = Number(req.query.pageNumber);
            const pageSize = Number(req.query.pageSize);
            const categoryId = req.query.categoryId;
            const subCategoryId = req.query.subCategoryId;
            const option = req.query.option


            if (categoryId && !subCategoryId && !option) {
                const total = await Product.find({ categoryId: categoryId }).countDocuments()
                const product = await Product.find({ categoryId: categoryId }).sort({ 'createdAt': -1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && subCategoryId && !option) {
                const total = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId }).sort({ 'createdAt': -1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 1 && !subCategoryId) {
                const total = await Product.find({ categoryId: categoryId }).countDocuments()
                const product = await Product.find({ categoryId: categoryId }).sort({ 'createdAt': -1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 2 && !subCategoryId) {
                const total = await Product.find({ categoryId: categoryId, typeOfSell: 'Cá nhân' }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, typeOfSell: 'Cá nhân' }).sort({ 'createdAt': -1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 3 && !subCategoryId) {
                const total = await Product.find({ categoryId: categoryId, typeOfSell: 'Bán chuyên' }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, typeOfSell: 'Bán chuyên' }).sort({ 'createdAt': -1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 4 && !subCategoryId) {
                console.log("hello");
                const total = await Product.find({ categoryId: categoryId }).countDocuments()
                const product = await Product.find({ categoryId: categoryId }).sort({ price: 1 }).collation({ locale: "vi", numericOrdering: true })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 5 && !subCategoryId) {
                const total = await Product.find({ categoryId: categoryId }).countDocuments()
                const product = await Product.find({ categoryId: categoryId }).sort({ price: -1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 6 && !subCategoryId) {
                const total = await Product.find({ categoryId: categoryId }).countDocuments()
                const product = await Product.find({ categoryId: categoryId }).sort({ 'createdAt': 1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 1 && subCategoryId) {
                const total = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId }).sort({ 'createdAt': -1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 2 && subCategoryId) {
                const total = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId, typeOfSell: 'Cá nhân' }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId, typeOfSell: 'Cá nhân' }).sort({ 'createdAt': -1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 3 && subCategoryId) {
                const total = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId, typeOfSell: 'Bán chuyên' }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId, typeOfSell: 'Bán chuyên' }).sort({ 'createdAt': -1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 4 && subCategoryId) {
                const total = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId }).sort({ price: 1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 5 && subCategoryId) {
                const total = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId }).sort({ price: -1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 6 && subCategoryId) {
                const total = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId }).sort({ 'createdAt': 1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else {
                res.status(404).json({ success: false, message: "Danh mục không tìm thấy" })
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })

        }
    }



}


module.exports = productController