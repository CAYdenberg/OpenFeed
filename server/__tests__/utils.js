import { findFeed } from '../utils'
const fs = require('fs')
const path = require('path')

describe('findFeed', () => {
  it('should find the url of a feed', () => {
    const html = fs.readFileSync(path.join(__dirname, './data/index.html'))
    const result = findFeed(html)
    expect(result).toEqual('/feed/')
  })
})
