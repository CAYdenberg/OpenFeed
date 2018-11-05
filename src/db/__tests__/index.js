import {upsert, remove} from '../index'

let CustomPouchError = new Error()
CustomPouchError.status = 404

const db = {
  put: jest.fn(() => Promise.resolve({ok: true})),
  remove: jest.fn(() => Promise.resolve({ok: true})),
  get: jest.fn(id =>
    (id === 'existingdoc')
      ? Promise.resolve({
        _id: id,
        _rev: 'revision'
      })
      : Promise.reject(CustomPouchError)
  )
}

describe('upsert', () => {
  const doc = {
    _id: 'newdoc',
    title: 'New feed',
  }

  it('should create a new feed if one does not already exist', () => {
    const result = upsert(doc)(db)
    return expect(result).resolves.toEqual({ok: true})
  })

  it('should update a feed if it is already present', () => {
    const doc = {
      _id: 'existingdoc',
      title: 'Existing doc'
    }
    const result = upsert(doc)(db)
    return expect(result).resolves.toEqual({ok: true})
  })

  it('should upsert multiple documents', () => {
    const doc = {
      _id: 'newdoc',
      title: 'New doc',
    }
    const doc2 = {
      _id: 'anothernewdoc',
      title: 'New doc',
    }

    const result = upsert([doc, doc2])(db)
    return expect(result).resolves.toEqual([
      {ok: true},
      {ok: true}
    ])
  })
})

describe('remove', () => {
  it('should remove a document by id', () => {
    const result = remove('existingdoc')(db)
    return expect(result).resolves.toHaveProperty('ok', true)
  })
})

// TODO: get, patch, generic find
