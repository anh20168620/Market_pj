const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'product'
    },
    content: {
        type: String,
        required: true
    }
},
    { timestamps: true })
module.exports = mongoose.model('report', reportSchema)