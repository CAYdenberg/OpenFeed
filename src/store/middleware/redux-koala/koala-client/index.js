import PouchDB from 'pouchdb'
import Find from 'pouchdb-find'
import getUser from './getUser'
import {NOUSER_DB} from './constants'

const defaultActions = {
  onReady: () => null,
  onChange: () => null,
  onPaused: () => null,
  onActive: () => null,
  onDenied: () => null,
  onComplete: () => null,
  onError: () => null
}

PouchDB.plugin(Find)

window.PouchDB = PouchDB

export default (remoteUrl, actions) => {
  const {onReady, onChange, onPaused, onActive, onDenied, onComplete, onError} = {
    ...defaultActions,
    ...actions
  }

  const {action, username, token} = getUser()
  const dbName = username || NOUSER_DB

  // provision our new database
  const db = new PouchDB(dbName)
  db.createIndex({
    index: {fields: ['modified', 'type', 'parent']}
  })

  // on signup, we take the special action of replicating the unauthenticated
  // database into the user's newly provisioned database
  if (action === 'signup') {
    const oldDb = new PouchDB(NOUSER_DB)
    PouchDB.replicate(oldDb, db).on('complete', () => {
      oldDb.destroy()
      onReady(username, dbName)
    })
  } else {
    // dispatch on next tick because we can't dispatch during middleware
    // contruction
    setTimeout(() => onReady(username, dbName), 0)
  }

  // sync only if this is a real user database (not unauthenticated)
  if (username) {
    const remoteDb = new PouchDB(`${remoteUrl}/${username}`, {
      headers: {
        'x-jwt': token
      }
    })
    PouchDB.sync(remoteDb, db, {live: true, retry: true})
      .on('change', onChange)
      .on('paused', onPaused)
      .on('active', onActive)
      .on('denied', onDenied)
      .on('complete', onComplete)
      .on('error', onError)
  }

  return db
}
