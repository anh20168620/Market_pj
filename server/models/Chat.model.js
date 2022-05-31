const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    lastestMessage: {
        type: Schema.Types.ObjectId,
        ref: 'message'
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'product'
    }
},
    { timestamps: true })
module.exports = mongoose.model('chat', chatSchema);