
export const upsert = (doc) => db => {
  if (Array.isArray(doc)) {
    return Promise.all(doc.map(singleDoc => upsert(singleDoc)(db)))
  }

  return db.get(doc._id).then(existingDoc => {
    const newDoc = Object.assign({}, doc, {_rev: existingDoc._rev})
    return db.put(newDoc)
  }).catch(err => {
    if (err.status === 404) {
      return db.put(doc)
    }
    return Promise.reject(err)
  })
}

export const remove = id => db => {
  return db.get(id).then(existingDoc => {
    return db.remove(existingDoc)
  })
}

export const getFeeds = () => db => {
  return db.find({
    selector: {
      type: {$eq: 'feed'},
      modified: {$gt: null},
    },
    sort: ['modified']
  }).then(res => res.docs)
}

export const loadPostsByFeed = feedUrl => db => {
  return db.find({
    selector: {
      type: {$eq: 'post'},
      parent: {$eq: feedUrl},
      modified: {$gt: null},
    },
    sort: ['modified']
  }).then(res => res.docs)
}
