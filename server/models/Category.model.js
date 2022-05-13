const mongoose = require('mongoose');
// name
// image

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: 'subCategory',
        required: false
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: false
    }
}
)
module.exports = mongoose.model('category', categorySchema)


