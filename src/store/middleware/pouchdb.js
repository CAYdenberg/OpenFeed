import PouchDB from 'pouchdb'
import Find from 'pouchdb-find'

PouchDB.plugin(Find)

export function createMiddleware(db) {
  return store => next => action => {
    next(action)

    const {pouch} = action
    if (pouch) {
      const operation = pouch(db, store.getState)

      operation.then(operationResult => {
        return store.dispatch(action.response(operationResult))
      }).catch(err => {
        return store.dispatch(action.error(err.status, err))
      })
    }
  }
}

export default (dbName) => {
  const db = new PouchDB(dbName)
  db.createIndex({
    index: {fields: ['type', 'modified', 'parent']}
  })
  window.db = db
  return createMiddleware(db)
}
