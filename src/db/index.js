
export const getFeeds = () => db => {
  return db.find({
    selector: {
      type: {$eq: 'feed'}
    }
  }).then(res => res.docs)
}

/**
 * Wishlist: when encountering conflicts, update the feed data only
 * when the date_modified data exists and is later than any existing one.
 */
export const upsertPost = post => db => {

}

export const upsert = (doc) => db => {
  return db.get(doc._id).then(existingDoc => {
    const newDoc = Object.assign({}, doc, {_rev: existingDoc._rev})
    return db.put(newDoc).then(() => newDoc)
  }).catch(err => {
    if (err.status === 404) {
      return db.put(doc).then(() => doc)
    }
    return Promise.reject(err)
  })
}
