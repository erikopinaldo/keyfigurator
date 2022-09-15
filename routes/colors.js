const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const colorsController = require('../controllers/colors')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', colorsController.getIndex)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router