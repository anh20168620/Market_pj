const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    content: {
        type: String,
        trim: true
    },
    chatId: {
        type: Schema.Types.ObjectId,
        ref: 'chat'
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('message', messageSchema);
