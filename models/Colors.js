const mongoose = require('mongoose')

const ColorsSchema = new mongoose.Schema({
    backgroundColor: {
        type: String,
        required: true,
    }, 
    caseColor: {
        type: String,
        required: true,
    },
    keysColor: {
        type: String,
        required: true,
    }, 
    colorName: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('colors', ColorsSchema)
