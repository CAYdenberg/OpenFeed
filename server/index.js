/* eslint-disable no-console */
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')
const Bundler = require('parcel-bundler')
const feed2json = require('../../feed2json-middleware')

const app = express()

app.set('port', process.env.PORT || 3000)

app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/convert', feed2json)

if (process.env.NODE_ENV === 'development') {
  let bundler = new Bundler('src/index.html')
  app.use(bundler.middleware())
}
app.use(express.static(path.join(__dirname, '../dist')))

app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d', app.get('port'))
  console.log('  Press CTRL-C to stop\n')
})
