const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notifySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
    ,
    seen: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true })

module.exports = mongoose.model('notify', notifySchema)