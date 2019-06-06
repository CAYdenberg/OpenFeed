import { findFeed, qualifyUrl } from '../utils'
const fs = require('fs')
const path = require('path')

describe('findFeed', () => {
  it('should find the url of a feed', () => {
    const html = fs.readFileSync(path.join(__dirname, './data/index.html'))
    const result = findFeed(html)
    expect(result).toEqual('/feed/')
  })
})

describe('qualifyUrl', () => {
  it('should return a fully-qualified url as itself', () => {
    const result = qualifyUrl('http://feedburner.com/feed/', 'http://example.com')
    expect(result).toEqual('http://feedburner.com/feed/')
  })

  it('should return a rooted url as a fully-qualified url', () => {
    const result = qualifyUrl('/feed/', 'http://example.com')
    expect(result).toEqual('http://example.com/feed/')
  })

  it('should return a relative url as a fully qualified url', () => {
    const result = qualifyUrl('feed/', 'http://example.com/blog/')
    expect(result).toEqual('http://example.com/blog/feed/')
  })

  it('should handle a url with a domain but not a protocol', () => {
    const result = qualifyUrl('feedburner.com/feed/', 'http://example.com')
    expect(result).toEqual('http://feedburner.com/feed/')
  })
})
