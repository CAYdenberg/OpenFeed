import PouchDB from 'pouchdb'
import Find from 'pouchdb-find'

import getUser from './getUser'
import mapDispatchToPouch from './mapDispatchToPouch'
import {NOUSER_DB} from './constants'

PouchDB.plugin(Find)

window.PouchDB = PouchDB

export default (readyTasks, remoteUrl) => store => {
  const actions = mapDispatchToPouch(store.dispatch)

  const {action, username, token} = getUser()
  const dbName = username || NOUSER_DB

  // provision our new database
  const db = new PouchDB(dbName)
  db.createIndex({
    index: {fields: ['type', 'modified', 'parent']}
  })

  // on signup, we take the special action of replicating the unauthenticated
  // database into the user's newly provisioned database
  if (action === 'signup') {
    const oldDb = new PouchDB(NOUSER_DB)
    PouchDB.replicate(oldDb, db).on('complete', () => {
      oldDb.destroy()
      actions.onReady(readyTasks, username)
    })
  } else {
    // dispatch on next tick because we can't dispatch during middleware
    // contruction
    setTimeout(() => actions.onReady(readyTasks, username), 0)
  }

  // sync only if this is a real user database (not unauthenticated)
  if (username) {
    const remoteDb = new PouchDB(`${remoteUrl}/${username}`, {
      headers: {
        'x-jwt': token
      }
    })
    PouchDB.sync(remoteDb, db, {live: true, retry: true})
      .on('change', actions.onChange)
      .on('paused', actions.onPaused)
      .on('active', actions.onActive)
      .on('denied', actions.onDenied)
      .on('complete', actions.onComplete)
      .on('error', actions.onError)
  }

  return next => action => {
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
