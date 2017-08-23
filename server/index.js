'use strict'

const express = require('express')
const search = require('../src/data-gather/search')
const suggest = require('../src/data-gather/suggest')
const fetch = require('../src/data-gather/fetch')
const path = require('path')
const port = 3000
const app = express()

app.use(express.static("public"))

app.get('/wiki', (req, res, next) => {
    search(req.query.input)
        .then(concepts => res.json(concepts))
        .catch(next)
})

app.get('/suggest', (req, res, next) => {
    suggest(req.query.input)
        .then(suggestions => res.send(suggestions))
        .catch(next)
})

app.get('/data', (req, res, next) => {
    fetch(req.query.input)
        .then(paragraph => res.send(paragraph))
        .catch(next)
})

app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.listen(port, (err) => {
    if (err) throw err
    console.log('HTTP server patiently listening on port', port)
})
