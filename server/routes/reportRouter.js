const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController')

// save report
router.post('/save', reportController.save)

// get reports
router.get('/get', reportController.get)

// delete report
router.delete('/delete/:reportId', reportController.delete)

// get report by id
router.get('/getReport', reportController.getReport)


module.exports = router