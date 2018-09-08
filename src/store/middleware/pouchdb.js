import PouchDB from 'pouchdb'
window.PouchDB = PouchDB

export function createMiddleware(db) {
  return store => next => action => {
    next(action)

    if (action.pouch) {
      const state = store.getState()
      const operation = action.pouch(db, state)
      operation.then(operationResult => {
        store.dispatch({type: '@@redux-pouchdb/DONE', result: operationResult})
      })
    }
  }
}

export default dbName => {
  const db = new PouchDB(dbName)
  return createMiddleware(db)
}
