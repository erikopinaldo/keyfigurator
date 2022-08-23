require('dotenv').config()

const express = require('express')
const app = express()
const connectDB = require('./config/database')
const colorsRoutes = require('./routes/colors')

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', colorsRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
}) 