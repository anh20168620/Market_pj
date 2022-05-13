const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: false
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: false
    }
})
module.exports = mongoose.model('subCategory', subCategorySchema)


