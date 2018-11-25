import update from 'immutability-helper'

import {filterObjectByKeys} from '../helpers'
import {getFeeds, upsert, remove} from '../db'

const ALLOWED_KEYS = ['version', 'title', 'home_page_url', 'feed_url', 'description', 'author']

export const constants = {
  LOAD_FEEDS: 'FEEDS/LOAD_FEEDS',
  LOAD_FEEDS_OK: 'FEEDS/LOAD_FEEDS_OK',
  LOAD_FEEDS_ERR: 'FEEDS/LOAD_FEEDS_ERR',

  UPSERT_FEED: 'FEEDS/UPSERT_FEED',
  UPSERT_FEED_OK: 'FEEDS/UPSERT_FEED_OK',
  UPSERT_FEED_ERR: 'FEEDS/UPSERT_FEED_ERR',

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

  loadFeedsErr: status => {
    console.log(status)
  },

  upsertFeed: (data, id) => {
    const doc = {
      modified: new Date().getTime(),
      type: 'feed',
      _id: id,
      ...filterObjectByKeys(data, ALLOWED_KEYS)
    }

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

  upsertFeedErr: (status, error) => {
    console.error(error)
    return {type: c.UPSERT_FEED_ERR, status}
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
  }

  return initialState
}
