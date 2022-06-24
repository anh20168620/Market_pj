const multer = require('multer');


const uploadImageCategory = multer({
    dest: 'public/image_category',
})

module.exports = uploadImageCategory