const mongoose = require('mongoose');
// fullName
// email
// password
// avatar
// notify

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avtar: {
        type: String,
        default: 'avatar_default.png'
    },
    notify: {
        type: Array
    }
})
module.exports = mongoose.model('admin', adminSchema)