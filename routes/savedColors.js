const express = require('express')
const router = express.Router()
const savedColorsController = require('../controllers/savedColors')

router.get('/', savedColorsController.getColors)

router.post('/saveColor', savedColorsController.createColor)

router.delete('/deleteColor', savedColorsController.deleteColor)

module.exports = router