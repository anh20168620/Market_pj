const mongoose = require('mongoose');
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


const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        default: "Chưa có ngày sinh"
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
    avatar: {
        type: String,
        default: 'avatar_default.png'
    },
    address: {
        type: String,
        default: 'Chưa có địa chỉ'
    },
    notify: {
        type: Array
    },
    isActive: {
        type: Boolean,
        default: false
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

module.exports = mongoose.model('user', userSchema)