const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController')

// save report
router.post('/save', reportController.save)

// get report
router.get('/get', reportController.get)

// delete report
router.delete('/delete/:reportId', reportController.delete)

module.exports = router