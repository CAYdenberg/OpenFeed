
import c from './types'

export default (dispatch) => {
  return {
    onReady(username, dbName) {
      dispatch({type: c.DB_READY, username, dbName})
    },

    onChange(change) {
      console.log(change)
    },

    onDenied() {
      dispatch({type: c.DENIED})
    },

    onComplete() {
      dispatch({type: c.COMPLETE})
    },

    onError() {
      dispatch({type: c.ERROR})
    },
  }
}
