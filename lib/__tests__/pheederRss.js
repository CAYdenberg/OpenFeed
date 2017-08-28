const pheeders = require('../pheeders')
const pheederRss = pheeders.rss

const path = require('path')
const {readFileSync} = require('fs')

describe('pheederRss', () => {
  const caseyy = pheederRss(readFileSync(path.join(__dirname, 'fixtures/caseyy.xml'), 'utf-8'))

  it('should have a title', () => {
    return expect(caseyy).resolves.toHaveProperty('title', 'Casey Ydenberg\'s blog feed')
  })
})
