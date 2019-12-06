function isValidPouch(doc) {
  if (Array.isArray(doc)) {
    return doc.every(isValidPouch);
  }
  return !!doc._id;
}

export const upsert = doc => db => {
  if (Array.isArray(doc)) {
    return Promise.all(doc.map(singleDoc => upsert(singleDoc)(db)));
  }

  return db
    .get(doc._id)
    .then(existingDoc => {
      const newDoc = Object.assign({}, existingDoc, doc, {
        _rev: existingDoc._rev,
      });
      return db.put(newDoc);
    })
    .catch(err => {
      if (err.status === 404) {
        return db.put(doc);
      }
      return Promise.reject(err);
    });
};

export const remove = id => db => {
  return db.get(id).then(existingDoc => {
    return db.remove(existingDoc);
  });
};

export const upsertFromStore = selector => (db, getState) => {
  const state = getState();
  const docs = selector(state);
  if (!isValidPouch(docs)) {
    return Promise.reject(
      new Error('Attempting to save to Pouch without an _id')
    );
  }
  return upsert(docs)(db);
};

export const getFeeds = () => db => {
  return db
    .find({
      selector: {
        type: { $eq: 'feed' },
      },
    })
    .then(res => res.docs);
};

export const loadPosts = () => db => {
  return db
    .find({
      selector: {
        type: { $eq: 'post' },
        modified: { $gt: null },
      },
      sort: [{ modified: 'desc' }],
      limit: 50,
      // })
      // .catch(() => {
      //   return db.find({
      //     selector: {
      //       type: {$eq: 'post'},
      //     },
      //     limit: 50
      //   })
    })
    .then(res => res.docs);
};

export const loadPostsByFeed = feedUrl => db => {
  return db
    .find({
      selector: {
        type: { $eq: 'post' },
        parent: { $eq: feedUrl },
        modified: { $gt: null },
      },
      sort: [{ modified: 'desc' }],
      limit: 50,
    })
    .then(res => res.docs);
};
