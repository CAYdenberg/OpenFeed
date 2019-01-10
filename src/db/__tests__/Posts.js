import {determineModified} from '../Posts'

describe('determineModified', () => {
  it('should use the date_modified if present', () => {
    const feed = {
      title: 'My Post',
      date_modified: '2019-01-02',
      date_published: '2019-01-01'
    }
    expect(determineModified(feed)).toEqual('2019-01-02')
  })

  it('should use the date_published if not available', () => {
    const feed = {
      title: 'My Post',
      date_published: '2019-01-01'
    }
    expect(determineModified(feed)).toEqual('2019-01-01')
  })

  it('should otherwise use the current time', () => {
    const feed = {
      title: 'My Post',
    }
    expect(determineModified(feed)).toBeTruthy()
  })
})
