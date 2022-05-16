const express = require('express');
const multer = require('multer');
const router = express.Router();
const avatarController = require('../controllers/avatarController')
const uploadAvatar = require('../middlewares/uploads/uploadAvatar')


// upload avatar
router.post('/avatar/:id', uploadAvatar.single('avatar'), avatarController.avatar)



module.exports = router;