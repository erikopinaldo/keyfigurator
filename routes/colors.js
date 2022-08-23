const express = require('express')
const router = express.Router()
const colorsController = require('../controllers/colors')

router.get('/', colorsController.getColors)

router.post('/createColor', colorsController.createColor)

router.delete('/deleteColor', colorsController.deleteColor)

module.exports = router