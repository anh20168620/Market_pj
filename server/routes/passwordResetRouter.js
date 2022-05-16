const express = require('express');
const router = express.Router();

const { sendLinkReset, verifyUrl, resetPassword } = require('../controllers/passwordResetController');

// send link reset pasword 
router.post('/', sendLinkReset)

// verify url
router.get('/:id/:token', verifyUrl)

// reset password
router.post('/:id/:token', resetPassword)

module.exports = router