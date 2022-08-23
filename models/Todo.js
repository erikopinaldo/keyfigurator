const mongoose = require('mongoose')

const ColorsSchema = new mongoose.Schema()

module.exports = mongoose.model('colors', ColorsSchema)
