const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController')
const uploadAvatar = require('../middlewares/uploads/uploadAvatar')

// upload avatar
router.post('/avatar/:id', uploadAvatar.single('avatar'), uploadController.avatar)

module.exports = router;