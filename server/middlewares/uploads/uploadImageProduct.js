const multer = require('multer');
// set storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, 'public/image_product') },
    filename: function (req, file, cb) {
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'))
        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})

module.exports = uploadImageProduct = multer({
    storage: storage, fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }

    }, limits: { fileSize: 6000000, files: 3 }

}).array('imageProduct')