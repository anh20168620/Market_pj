const multer = require('multer');
// set storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, 'public/image_product') },
    filename: function (req, file, cb) {
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'))
        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})

module.exports = uploadImageProduct = multer({ storage: storage })