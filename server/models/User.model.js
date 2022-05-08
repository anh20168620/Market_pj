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
        type: Date,
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
        default: 'avatar/avatar_default.png'
    },
    address: {
        type: String,
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