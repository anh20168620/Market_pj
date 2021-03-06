const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenAdminSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'admin',
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
module.exports = mongoose.model('tokenAdmin', tokenAdminSchema)