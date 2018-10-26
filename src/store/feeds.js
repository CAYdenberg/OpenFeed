import update from 'immutability-helper'

import {getFeeds, upsertFeed} from '../db'

export const constants = {
  LOAD_FEEDS: 'FEEDS/LOAD_FEEDS',
  ADD_FEEDS: 'FEEDS/ADD_FEEDS',
  REQ_NEW_FEED: 'FEEDS/REQ_NEW_FEED',
  ADD_NEW_FEED: 'FEEDS/ADD_NEW_FEED',
  ADD_NEW_FEED_SUCCESS: 'FEEDS/ADD_NEW_FEED_SUCCESS',
  ADD_NEW_FEED_ERROR: 'FEEDS/ADD_NEW_FEED_ERROR'
}
const c = constants

export const actions = {
  loadFeeds: () => {
    return {
      type: c.LOAD_FEEDS,
      pouch: getFeeds(),
      response: actions.addFeeds,
      error: actions.getFeedsError
    }
  },

  addFeeds: feeds => {
    return {type: c.ADD_FEEDS, feeds}
  },

  getFeedsError: status => {
    console.log(status)
  },

  reqNewFeed: url => {
    return {
      type: c.REQ_NEW_FEED,
      popsicle: {
        url: `/convert?url=${encodeURIComponent(url)}`
      },
      response: res => actions.addNewFeed(res, url)
    }
  },

  addNewFeed: (res, url) => {
    const uniqueUrl = res.feed_url || url
    return {
      type: c.ADD_NEW_FEED,
      pouch: upsertFeed(res, uniqueUrl),
      response: actions.addNewFeedRes,
      error: actions.addNewFeedError
    }
  },

  addNewFeedRes: feed => {
    return {type: c.ADD_NEW_FEED_SUCCESS, feed}
  },

  addNewFeedError: (status, error) => {
    console.error(error)
    return {type: c.ADD_NEW_FEED_ERROR, status}
  }
}

export const reducer = (inputState = {}, action) => {
  const defaultState = {
    newFeedRequestState: 0,
    feeds: [],
    feedsLoadState: 0,
    currentFeed: ''
  }
  const initialState = update(defaultState, {$merge: inputState})

  switch (action.type) {
    case c.LOAD_FEEDS: {
      return update(initialState, {
        feedsLoadState: {$set: 1}
      })
    }

    case c.ADD_FEEDS: {
      return update(initialState, {
        feedsLoadState: {$set: 2},
        feeds: {$set: action.feeds}
      })
    }

    case c.REQ_NEW_FEED: {
      return update(initialState, {
        newFeedRequestState: {$set: 1}
      })
    }

    case c.ADD_NEW_FEED_SUCCESS: {
      return update(initialState, {
        newFeedRequestState: {$set: 0},
        feeds: {$push: [action.feed]}
      })
    }
  }

  return initialState
}
