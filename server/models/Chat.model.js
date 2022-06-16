const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'product'
    },
    lastMessageId: {
        type: Schema.Types.ObjectId,
        ref: 'message'
    },
    seen: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true })
module.exports = mongoose.model('chat', chatSchema);