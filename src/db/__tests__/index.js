import {upsert} from '../index'

let CustomPouchError = new Error()
CustomPouchError.status = 404

describe('upsert', () => {
  const db = {
    put: jest.fn(() => Promise.resolve()),
    get: jest.fn(id =>
      (id === 'existingdoc')
        ? Promise.resolve({
          _id: id,
          _rev: 'revision'
        })
        : Promise.reject(CustomPouchError)
    )
  }
  const doc = {
    _id: 'newdoc',
    title: 'New feed',
  }

  it('should create a new feed if one does not already exist', () => {
    const result = upsert(doc)(db)
    return expect(result).resolves.toEqual(doc)
  })

  it('should update a feed if it is already present', () => {
    const doc = {
      _id: 'existingdoc',
      title: 'Existing doc'
    }
    const result = upsert(doc)(db)
    return expect(result).resolves.toEqual({
      _id: 'existingdoc',
      _rev: 'revision',
      title: 'Existing doc'
    })
  })
})
