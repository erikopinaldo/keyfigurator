const bodyParser = require('body-parser');
const express = require('express');
const { allowedNodeEnvironmentFlags } = require('process');
const app = express();

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))

app.listen(8000, () => console.log('Listening on port 8000'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})

app.post('/save-color', (req, res) => {
    console.log(req.body)
})