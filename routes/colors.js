const express = require('express')
const router = express.Router()
const colorsController = require('../controllers/colors')

router.get('/', colorsController.getIndex)

module.exports = router