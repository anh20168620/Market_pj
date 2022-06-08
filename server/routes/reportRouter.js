const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController')

// save report
router.post('/save', reportController.save)

module.exports = router