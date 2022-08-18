require('dotenv').config()

const bodyParser = require('body-parser');
const express = require('express');
const { allowedNodeEnvironmentFlags } = require('process');
const app = express();

const MongoClient = require('mongodb').MongoClient
const dbConnectionString = process.env.DB_CONNECTION_STRING 

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

app.listen(8000, () => console.log('Listening on port 8000'))

MongoClient.connect(dbConnectionString)
.then(client => {
    console.log('Connected to DB')
    const db = client.db('keyfigurator')
    const colorsCollection = db.collection('colors')

    app.post('/save-color', (req, res) => {
        colorsCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
        })
        .catch(error => console.error(error))
    })
})
.catch(error => console.error(error))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})