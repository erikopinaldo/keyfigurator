const bodyParser = require('body-parser');
const express = require('express');
const { allowedNodeEnvironmentFlags } = require('process');
const app = express();

const MongoClient = require('mongodb').MongoClient

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))

app.listen(8000, () => console.log('Listening on port 8000'))

let mongoConnectionString = 'mongodb+srv://eopinaldo:yFZduDPXdv4bMjLgqm4X@cluster0.c6bao1l.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(mongoConnectionString)
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