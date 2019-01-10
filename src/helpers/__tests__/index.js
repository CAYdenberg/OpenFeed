import deepFreeze from 'deep-freeze'
import {
  getId,
  determineFeedId,
  filterObject,
  filterObjectByKeys
} from '../index'

describe('getId', () => {
  it('should return the id, if available', () => {
    const record = {
      id: 'ID',
      _id: 'NOTANID',
      name: 'frodo'
    }
    expect(getId(record)).toEqual('ID')
  })

  it('should return the _id, if no id is available', () => {
    const record = {
      _id: 'ID',
      name: 'frodo'
    }
    expect(getId(record)).toEqual('ID')
  })

  it('should only return the object identifier part of the id', () => {
    const record = {
      _id: 'gb|contacts|ID',
      name: 'frodo'
    }
    expect(getId(record)).toEqual('ID')
  })

  it('should throw if no id is available', () => {
    const record = {
      name: 'Smeagol',
      nickname: 'Gollum'
    }
    expect(() => getId(record)).toThrow()
  })

  it('should throw if there is an id containing | characters but the format does not make sense', () => {
    const record = {
      id: 'gb|ID',
      name: 'Smeagol',
      nickname: 'Gollum'
    }
    expect(() => getId(record)).toThrow()
  })
})

describe('determineFeedId', () => {
  it('should create a new pheed id without a trailing slash', () => {
    const result = determineFeedId('http://reactjsnewsletter.com/issues.rss')
    expect(result).toEqual('pheed|feed|http://reactjsnewsletter.com/issues.rss')
  })

  it('should remove the trailing slash if one is present', () => {
    const result = determineFeedId('http://reactjsnewsletter.com/issues.rss/')
    expect(result).toEqual('pheed|feed|http://reactjsnewsletter.com/issues.rss')
  })
})

describe('filterObject', () => {
  const original = {
    negative: -1,
    positive: 2
  }

  it('should remove values when the filter function is false', () => {
    const positiveNumbers = filterObject(original, value => value > 0)
    expect(positiveNumbers).not.toHaveProperty('negative')
  })

  it('should keep values when the filter function is true', () => {
    const positiveNumbers = filterObject(original, value => value > 0)
    expect(positiveNumbers).toHaveProperty('positive', 2)
  })

  it('should use the identity filter by default', () => {
    const original = {
      zero: 0,
      negative: -1,
      positive: 2
    }
    const truthyValues = filterObject(original)
    expect(truthyValues).toHaveProperty('positive')
    expect(truthyValues).not.toHaveProperty('zero')
  })
})

describe('filterObjectByKeys', () => {
  const original = {
    name: 'Aragorn',
    email: 'aragorn@gondor.org',
    class: 'Ranger'
  }
  deepFreeze(original)

  it('should include properties that have been specified', () => {
    const filtered = filterObjectByKeys(original, ['name', 'email'])
    expect(filtered).toHaveProperty('name', 'Aragorn')
  })

  it('should exlude properties that have not been specified', () => {
    const filtered = filterObjectByKeys(original, ['name', 'email'])
    expect(filtered).not.toHaveProperty('class')
  })
})
