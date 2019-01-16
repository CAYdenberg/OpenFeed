/* eslint-disable no-console */
require('dotenv').config()

const Koala = require('koala-server')
const rss2json = require('rss-to-json-feed')

Koala(router => {
  router.get('/convert', (req, res) => {
    rss2json.parseURL(req.query.url, {}, (err, json) => {
      if (err) return res.status(400).json({error: 'Feed could not be parsed'})
      return res.json(json)
    })
  })

  return router
})
