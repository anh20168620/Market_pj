const fs = require('fs');
const User = require('../models/User.model')
const Product = require('../models/Product.model')

const uploadController = {
    // change avatar
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
            } else {
                const images = req.body.image
                for (const image of images) {
                    fs.unlinkSync(`public/image_product/${image}`)
                }
            }

        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }

    }



}



module.exports = uploadController