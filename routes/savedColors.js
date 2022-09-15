const express = require('express')
const router = express.Router()
const savedColorsController = require('../controllers/savedColors')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, savedColorsController.getColors)

router.post('/saveColor', savedColorsController.createColor)

router.delete('/deleteColor', savedColorsController.deleteColor)

module.exports = router