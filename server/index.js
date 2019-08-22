/* eslint-disable no-console */
require('dotenv').config()
const path = require('path')

const Koala = require('koala-server')
const rss2json = require('rss-to-json-feed')
const axios = require('axios')
const { getContentType, findFeed } = require('./utils')
const Url = require('url-parse')

Koala(router => {
  router.get('/convert', (req, res) => {
    const convertUrlParts = new Url(req.query.url)

    if (convertUrlParts.protocol === 'internal:') {
      res.sendFile(path.join(__dirname, convertUrlParts.pathname))
      return
    }

    axios(req.query.url).then(externalRes => {
      const contentType = getContentType(externalRes)

      switch (contentType) {
        case 'application/json':
        case 'application/feed+json':
          res.send(externalRes.data)
          return

        case 'text/html':
          const feedUrl = findFeed(externalRes.data)
          const qualifiedFeedUrl = new Url(feedUrl, req.query.url).toString()
          if (feedUrl) {
            res.redirect(`/api/convert?url=${encodeURI(qualifiedFeedUrl)}`)
          } else {
            res.status(400).json({error: 'Unable to locate feed url'})
          }
          return

        default:
          rss2json.parseString(externalRes.data, (err, json) => {
            if (err) return res.status(400).json({error: 'Feed could not be parsed'})
            return res.json(json)
          })
      }
    }).catch(e => {
      console.error(e)
      res.status(404).json({error: 'Resource could not be found'})
    })
  })
  return router
})
