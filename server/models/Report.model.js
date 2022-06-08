const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'product'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},
    { timestamps: true })
module.exports = mongoose.model('report', reportSchema)