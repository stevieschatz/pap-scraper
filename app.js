const express = require('express')
const app = express()
const port = process.env.port ||  3000
const api = require('./lib/api.js')

app.set('port', port)

app.listen(port, () => {
    console.log('Listening on port 3000...')
})

app.get('/health', (req, res) => {
    res.send(200)
})

app.get('/clubs', (req, res, err) => {

    console.log('Clubs EP hit')

    $html = api.getClubs()

    res.send($html)



})


