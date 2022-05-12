const mongoose = require('mongoose');
// name
// image

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }
})
module.exports = mongoose.model('category', categorySchema)


