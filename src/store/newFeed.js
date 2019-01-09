import update from 'immutability-helper'
import {actions as feedActions} from './feeds'
import {actions as postActions} from './posts'

export const constants = {
  UPDATE_VALUE: 'NEW_FEED/UPDATE_VALUE',
  NEW_FEED_REQ: 'NEW_FEED/REQ',
  NEW_FEED_RES: 'NEW_FEED/RES',
  NEW_FEED_ERROR: 'NEW_FEED/ERROR',
  RESET: 'NEW_FEED/RESET',
  NOOP: 'NOOP',
}
const c = constants

export const actions = {
  updateValue: value =>
    ({type: c.UPDATE_VALUE, value}),

  newFeedReq: () => {
    return {
      type: c.NEW_FEED_REQ,
      popsicle: state => ({
        url: `/convert?url=${encodeURIComponent(state.newFeed.value)}`
      }),
      response: actions.newFeedRes,
      error: actions.newFeedError
    }
  },

  newFeedRes: res =>
    ({type: c.NEW_FEED_RES, res}),

  newFeedError: status =>
    ({type: c.NEW_FEED_ERROR, status}),

  addFeedToDB: () => (dispatch, getState) => {
    const {loadState, feed, posts, value} = getState().newFeed
    const newFeedId = `pheed|feed|${value}`
    if (loadState < 2) dispatch({type: c.NOOP})
    dispatch(feedActions.upsertFeed(feed, newFeedId))
    dispatch(postActions.populate(posts, newFeedId))
    dispatch(actions.reset())
  },

  reset: () =>
    ({type: c.RESET}),
}

export const reducer = (inputState = {}, action) => {
  const defaultState = {
    value: '',
    loadState: 0,
    feed: null,
    posts: []
  }
  const initialState = update(defaultState, {$merge: inputState})

  switch (action.type) {
    case c.UPDATE_VALUE: {
      return update(defaultState, {
        value: {$set: action.value},
      })
    }

    case c.NEW_FEED_REQ: {
      if (!initialState.value) return initialState
      return update(initialState, {
        loadState: {$set: 1}
      })
    }

    case c.NEW_FEED_RES: {
      if (initialState.loadState !== 1) return initialState
      return update(initialState, {
        loadState: {$set: 2},
        feed: {$set: action.res},
        posts: {$set: action.res.items}
      })
    }

    case c.NEW_FEED_ERROR: {
      if (initialState.loadState !== 1) return initialState
      return update(initialState, {
        loadState: {$set: -1},
        feed: {$set: defaultState.feed},
        posts: {$set: defaultState.posts}
      })
    }

    case c.RESET: {
      return defaultState
    }
  }
  return initialState
}
