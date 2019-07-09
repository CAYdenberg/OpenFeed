import update from 'immutability-helper'

import {getFeeds, upsert, remove} from '../db'
import Feed from '../db/Feed'
import reconcileDocs from '../helpers/reconcileDocs'
import {actions as error} from './errors'

const reconciler = reconcileDocs('feed', true)

export const constants = {
  LOAD_FEEDS: 'FEEDS/LOAD_FEEDS',
  LOAD_FEEDS_OK: 'FEEDS/LOAD_FEEDS_OK',
  LOAD_FEEDS_ERR: 'FEEDS/LOAD_FEEDS_ERR',

  UPSERT_FEED: 'FEEDS/UPSERT_FEED',
  UPSERT_FEED_OK: 'FEEDS/UPSERT_FEED_OK',

  REMOVE_FEED: 'FEEDS/REMOVE_FEED'
}
const c = constants

export const actions = {
  loadFeeds: () => {
    return {
      type: c.LOAD_FEEDS,
      pouch: getFeeds(),
      response: actions.loadFeedsOk,
      error: actions.loadFeedsErr
    }
  },

  loadFeedsOk: feeds => {
    return {type: c.LOAD_FEEDS_OK, feeds}
  },

  loadFeedsErr: () => {
    return error.set('Unable to load feeds')
  },

  upsertFeed: (data, id) => {
    const doc = Feed(data, id)
    return {
      type: c.UPSERT_FEED,
      pouch: upsert(doc),
      doc,
      response: actions.upsertFeedOk,
      error: actions.upsertFeedErr
    }
  },

  upsertFeedOk: ({ok, id, rev}) => {
    return {type: c.UPSERT_FEED_OK, ok, id, rev}
  },

  upsertFeedErr: () => {
    return error.set('Unable to update feed')
  },

  removeFeed: (id) => {
    return {
      type: c.REMOVE_FEED,
      id,
      pouch: remove(id),
      response: actions.upsertFeedOk,
      error: actions.upsertFeedErr,
    }
  }
}

export const reducer = (inputState = {}, action) => {
  const defaultState = {
    feeds: [],
    feedsLoadState: 0
  }
  const initialState = update(defaultState, {$merge: inputState})

  switch (action.type) {
    case c.LOAD_FEEDS: {
      return update(initialState, {
        feedsLoadState: {$set: 1}
      })
    }

    case c.LOAD_FEEDS_OK: {
      return update(initialState, {
        feedsLoadState: {$set: 2},
        feeds: {$set: action.feeds}
      })
    }

    case c.UPSERT_FEED: {
      const i = initialState.feeds.findIndex(feed => feed._id === action.doc._id)
      return update(initialState, {
        feeds: (i === -1)
          ? {$push: [action.doc]}
          : {$splice: [[i, 1, action.doc]]}
      })
    }

    case c.UPSERT_FEED_OK: {
      const i = initialState.feeds.findIndex(feed => feed._id === action.id)
      if (i === -1) return initialState
      return update(initialState, {
        feeds: {[i]: {$merge: {_rev: action.rev}}}
      })
    }

    case c.REMOVE_FEED: {
      const i = initialState.feeds.findIndex(feed => feed._id === action.id)
      return update(initialState, {
        feeds: {$splice: [[i, 1]]}
      })
    }

    case '@@koala-redux/CHANGE': {
      return update(initialState, {
        feeds: {$set: reconciler(initialState.feeds, action.changes, action.deletions)}
      })
    }
  }

  return initialState
}
