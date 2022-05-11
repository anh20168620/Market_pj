const multer = require('multer');


const uploadAvatar = multer({
    dest: 'public/avatar',
})

module.exports = uploadAvatar