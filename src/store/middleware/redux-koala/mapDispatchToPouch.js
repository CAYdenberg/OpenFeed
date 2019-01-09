
import c from './types'

export default (dispatch) => {
  return {
    onReady(tasks, username) {
      dispatch({type: c.SET_USER, username})
      tasks.forEach(task => {
        dispatch(task())
      })
    },

    onChange(change) {
      console.log(change)
    },

    onPaused() {
      dispatch({type: c.PAUSED})
    },

    onActive() {
      dispatch({type: c.ACTIVE})
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
