const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenUserSchema = new Schema({
    user: {
        type: Schema.Type.ObjectId,
        required: true,
        ref: 'user',
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
        expires: 3600
    }
})
module.exports = mongoose.model('tokenUser', tokenUserSchema)