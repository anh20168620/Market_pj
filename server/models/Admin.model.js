const mongoose = require('mongoose');

// email
// password


const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('admin', adminSchema)