'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const wikiScan = require('../src/data-gather/wiki')
const app = express()
const path = require('path')
const port = 3000

app.use(express.static("public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// JSONP REQUEST DIRECTLY TO WIKI instead ? 
app.post('/query', (req, res, next) => {  // change to get request with req.query
    wikiScan(req.body.query)
        .then(concepts => {
            res.json(concepts)
        }).catch(next)
})

app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.listen(port, (err) => {
    if (err) throw err
    console.log('HTTP server patiently listening on port', port)
})