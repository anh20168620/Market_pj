const express = require('express');
// fullName
// email
// password
// avatar
// notify

const Schema = express.Schema;

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
module.exports = mongoose.model('Admin', adminSchema)