const express = require('express')
const router = express.Router()
const colorsController = require('../controllers/colors')

router.get('/', colorsController.getColors)

router.post('/save-color', colorsController.createColor)

router.delete('/deleteItem', colorsController.deleteColor)

module.exports = router