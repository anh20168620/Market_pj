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
    insurance: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        minLength: 10,
        maxLength: 1500
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Mới', 'Đã sử dụng(chưa sửa chữa)', 'Đã sử dụng(qua sửa chữa)'],
        require: true
    },
    image: {
        type: String,
        required: true
    },
    typeOfSell: {
        type: String,
        enum: ['Bán chuyên', 'Cá nhân']
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'category'
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: 'subCategory',
        required: true
    }
},
    { timestamps: true })
module.exports = mongoose.model('product', productSchema)


