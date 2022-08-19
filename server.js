require('dotenv').config()

const bodyParser = require('body-parser');
const express = require('express');
const { allowedNodeEnvironmentFlags } = require('process');
const app = express();

const MongoClient = require('mongodb').MongoClient
const dbConnectionString = process.env.DB_CONNECTION_STRING 

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine', 'ejs')

app.listen(8000, () => console.log('Listening on port 8000'))

MongoClient.connect(dbConnectionString)
.then(client => {
    console.log('Connected to DB')
    const db = client.db('keyfigurator')
    const colorsCollection = db.collection('colors')

    app.get('/', (req, res) => {
        db.collection('colors').find().toArray()
        .then(results => {
            console.log(results)
            res.render('index.ejs', {colors: results})
        })
        .catch(error => console.error(error))
        
    })
    
    app.post('/save-color', (req, res) => {
        colorsCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.delete('/deleteItem', (req, res) => {
        console.log('req body ', req.body)
        colorsCollection.deleteOne({colorName: req.body.itemFromJS})
        .then(result => {
            console.log('Color combination Deleted')
            res.json('Color Combination Deleted')
        })
        .catch(error => console.error(error))
    
    })
})
.catch(error => console.error(error))

