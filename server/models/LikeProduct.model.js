const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeProductSchema = new Schema({
    products: {
        type: Schema.Type.ObjectId,
        required: true,
        ref: 'product'
    },
    user: {
        type: Schema.Type.ObjectId,
        required: true,
        ref: 'user'
    }
},
    { timestamps: true })
module.exports = mongoose.model('likeProduct', LikeProductSchema)