const express = require('express');
const router = express.Router();

const subCategoryController = require('../controllers/subCategoryController')

// get subCategory
router.get('/get/:id', subCategoryController.get)

// update name subCategory 
router.post('/update-name/:id', subCategoryController.updateName)

// add new subCategory
router.post('/add-subCategory', subCategoryController.add)


// delete subCategory
router.delete('/delete/:id', subCategoryController.delete)

module.exports = router;