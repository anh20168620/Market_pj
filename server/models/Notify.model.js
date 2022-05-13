const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notifySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    content: {
        type: String,
        required: true
    },
    url: {
        type: String,
    },
    seen: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true })

module.exports = mongoose.model('notify', notifySchema)