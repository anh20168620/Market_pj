const express = require('express');
// fullName
// birthday
// email
// password
// avatar
// address
// notify
// isActive
// rate
// subscribe
// array
// numberPhone


const Schema = express.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
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
    address: {
        type: String,
        required: true,
    },
    notify: {
        type: Array
    },
    isActive: {
        type: Number,
        default: 0
    },
    rate: {
        type: Array
    },
    subscribe: {
        type: Array
    },
    numberPhone: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)