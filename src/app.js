const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({ origin: true }))

app.use(express.json())

app.use('/', require('./routes.js'))

module.exports = app
