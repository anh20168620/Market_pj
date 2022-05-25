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
            const total = await Product.find({ isActive: true, show: true }).countDocuments()
            const pageNumber = Number(req.query.pageNumber);
            const pageSize = Number(req.query.pageSize);

            const data = await Product.find({ isActive: true, show: true }).sort({ 'createdAt': -1 }).populate('userId categoryId subCategoryId', 'fullName-_id name-_id name-_id')
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
                const total = await Product.find({ categoryId: categoryId, isActive: true, show: true }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, isActive: true, show: true }).sort({ 'createdAt': -1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && subCategoryId && !option) {
                const total = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId, isActive: true, show: true }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId, isActive: true, show: true }).sort({ 'createdAt': -1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 1 && !subCategoryId) {
                const total = await Product.find({ categoryId: categoryId, isActive: true, show: true }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, isActive: true, show: true }).sort({ 'createdAt': -1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 2 && !subCategoryId) {
                const total = await Product.find({ categoryId: categoryId, typeOfSell: 'Cá nhân', isActive: true, show: true }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, typeOfSell: 'Cá nhân', isActive: true, show: true }).sort({ 'createdAt': -1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 3 && !subCategoryId) {
                const total = await Product.find({ categoryId: categoryId, typeOfSell: 'Bán chuyên', isActive: true, show: true }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, typeOfSell: 'Bán chuyên', isActive: true, show: true }).sort({ 'createdAt': -1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 4 && !subCategoryId) {
                console.log("hello");
                const total = await Product.find({ categoryId: categoryId, isActive: true, show: true }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, isActive: true, show: true }).sort({ price: 1 }).collation({ locale: "vi", numericOrdering: true })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 5 && !subCategoryId) {
                const total = await Product.find({ categoryId: categoryId, isActive: true, show: true }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, isActive: true, show: true }).sort({ price: -1 }).collation({ locale: "vi", numericOrdering: true })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 6 && !subCategoryId) {
                const total = await Product.find({ categoryId: categoryId, isActive: true, show: true }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, isActive: true, show: true }).sort({ 'createdAt': 1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 1 && subCategoryId) {
                const total = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId, isActive: true, show: true }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId, isActive: true, show: true }).sort({ 'createdAt': -1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 2 && subCategoryId) {
                const total = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId, typeOfSell: 'Cá nhân', isActive: true, show: true }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId, typeOfSell: 'Cá nhân', isActive: true, show: true }).sort({ 'createdAt': -1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 3 && subCategoryId) {
                const total = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId, typeOfSell: 'Bán chuyên', isActive: true, show: true }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId, typeOfSell: 'Bán chuyên', isActive: true, show: true }).sort({ 'createdAt': -1 })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 4 && subCategoryId) {
                const total = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId, isActive: true, show: true }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId, isActive: true, show: true }).sort({ price: 1 }).collation({ locale: "vi", numericOrdering: true })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 5 && subCategoryId) {
                const total = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId, isActive: true, show: true }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId, isActive: true, show: true }).sort({ price: -1 }).collation({ locale: "vi", numericOrdering: true })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .lean()
                res.status(200).json({ success: true, product, total })
            } else if (categoryId && option == 6 && subCategoryId) {
                const total = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId, isActive: true, show: true }).countDocuments()
                const product = await Product.find({ categoryId: categoryId, subCategoryId: subCategoryId, isActive: true, show: true }).sort({ 'createdAt': 1 })
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
    },

    // get your product display

    yourProductDisplay: async (req, res) => {
        try {
            const userId = req.query.userId;

            const productDisplay = await Product.find({ userId: userId, isActive: true, show: true })
            const total = await Product.find({ userId: userId, isActive: true, show: true }).countDocuments()
            if (productDisplay) {
                res.status(200).json({ success: true, productDisplay, total });
            } else {
                res.status(200).json({ success: false, message: 'Bạn chưa đăng sản phẩm nào' });
            }

        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    },

    // get your product hidden

    yourProductHidden: async (req, res) => {
        try {
            const userId = req.query.userId;

            const productHidden = await Product.find({ userId: userId, isActive: true, show: false })
            const total = await Product.find({ userId: userId, isActive: true, show: false }).countDocuments()
            if (productHidden) {
                res.status(200).json({ success: true, productHidden, total });
            } else {
                res.status(200).json({ success: false, message: 'Bạn chưa ẩn sản phẩm nào' });
            }

        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    },

    // hidden your product
    hiddenYourProduct: async (req, res) => {
        try {
            const productId = req.query.hiddenProductId;
            if (productId) {
                const product = await Product.findOneAndUpdate({ _id: productId }, { show: false })
                res.status(200).json({ success: true, message: 'Bạn đã ẩn tin thành công' })
            } else {
                res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' })

            }

        } catch (error) {
            res.status(500).json({ success: false, message: error.message })

        }
    },

    // display your product
    displayYourProduct: async (req, res) => {
        try {
            const productId = req.query.displayProductId;
            if (productId) {
                const product = await Product.findOneAndUpdate({ _id: productId }, { show: true })
                res.status(200).json({ success: true, message: 'Bạn đã hiện tin thành công' })
            } else {
                res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' })

            }

        } catch (error) {
            res.status(500).json({ success: false, message: error.message })

        }
    },

    // your product waiting for approval
    productWaiting: async (req, res) => {
        try {
            const userId = req.query.userId;

            const productWaiting = await Product.find({ userId: userId, isActive: false })
            const total = await Product.find({ userId: userId, isActive: false }).countDocuments()

            if (productWaiting) {
                res.status(200).json({ success: true, productWaiting, total });
            } else {
                res.status(200).json({ success: false, message: 'Bạn chưa có sản phẩm nào chờ duyệt' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })

        }
    },

    // get product by productId to update
    getProductById: async (req, res) => {
        try {
            const productId = req.query.productId;
            const product = await Product.findById(productId).populate('categoryId subCategoryId', 'name name')
            if (product) {
                res.status(200).json({ success: true, product })
            } else {
                res.status(404).json({ success: false, message: 'Sản phẩm không tìm thấy' })
            }

        } catch (error) {
            res.status(500).json({ success: false, message: error.message })

        }
    },

    // update image product 
    imageProductUpdate: async (req, res) => {
        try {
            const productId = req.query.productId
            if (productId) {
                const image = req.body.imageProduct
                const files = req.files

                console.log(image, files);

                res.status(200).json({ success: true, files, image })
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })

        }


    },

    // update product 
    productUpdate: async (req, res) => {
        try {
            const productId = req.query.productId;

            if (productId) {
                const product = await Product.findOneAndUpdate({ _id: productId }, {
                    title: req.body.title,
                    price: req.body.price,
                    insurance: req.body.insurance,
                    brand: req.body.brand,
                    description: req.body.description,
                    address: req.body.address,
                    status: req.body.status,
                    typeOfSell: req.body.typeOfSell,
                    image: req.body.image,
                    categoryId: req.body.categoryId,
                    subCategoryId: req.body.subCategoryId,
                    isActive: false

                })
                res.status(201).json({ success: true, message: "Sửa tin thành công, đợi xét duyệt tin của bạn" })
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })

        }

    }

}


module.exports = productController