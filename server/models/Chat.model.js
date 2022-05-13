const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    user_1: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    user_2: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    conversation: {
        type: Array,
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'product'
    }
},
    { timestamps: true })
module.exports = mongoose.model('chat', chatSchema);