const mongoose = require('mongoose');
// name
// title
// price
// brand
// address
// status
// description
// image
// video
// category
// typeOfSell
// user

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Mới', 'Đã sử dụng(chưa sủa chữa)', 'Đã sử dụng(qua sửa chữa'],
        require: true
    },
    description: {
        type: String,
        minLength: 10
    },
    image: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Type.ObjectId,
        required: true,
        ref: 'category'
    },
    sub_category: {
        type: String,
        required: true
    },

    typeOfSell: {
        type: String,
        enum: ['Bán chuyên', 'Cá nhân']
    },
    user: {
        type: Schema.Type.ObjectId,
        required: true,
        ref: 'user'
    }
},
    { timestamps: true })
module.exports = mongoose.model('product', productSchema)


