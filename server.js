/* eslint-disable no-console */
require('dotenv').config()

const Koala = require('koala-server')
const rss2json = require('rss-to-json-feed')
const axios = require('axios')
const ContentType = require('content-type')
const _get = require('lodash.get')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

function getContentType(res) {
  const ctHeader = res.headers['content-type']
  if (!ctHeader) return null
  return _get(ContentType.parse(ctHeader), 'type', null)
}

const FEED_TYPES = [
  'application/rss+xml',
  'application/atom+xml',
  'application/rdf+xml',
  'application/rss',
  'application/atom',
  'application/rdf',
  'text/rss+xml',
  'text/atom+xml',
  'text/rdf+xml',
  'text/rss',
  'text/atom',
  'text/rdf'
]

function findFeed(html) {
  const {document} = new JSDOM(html).window
  const links = document.querySelectorAll('link')
  let i
  for (i = 0; i < links.length; i++) {
    const link = links[i]
    if (FEED_TYPES.indexOf(link.getAttribute('type')) !== -1) {
      return link.getAttribute('href')
    }
  }
  return null
}

Koala(router => {
  router.get('/convert', (req, res) => {
    axios(req.query.url).then(externalRes => {
      const contentType = getContentType(externalRes)
      console.log(contentType)

      switch (contentType) {
        case 'application/json':
        case 'application/feed+json':
          res.send(externalRes.data)
          return

        case 'text/html':
          const feedUrl = findFeed(externalRes.data)
          if (feedUrl) {
            res.redirect(`/api/convert?url=${encodeURI(feedUrl)}`)
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
