import update from 'immutability-helper'

export const constants = {
  REQ_NEW_FEED: 'FEEDS/REQ_NEW_FEED',
  ADD_NEW_FEED: 'FEEDS/ADD_NEW_FEED'
}
const c = constants

export const actions = {
  reqNewFeed: url => {
    return {
      type: c.REQ_NEW_FEED,
      popsicle: {
        url: `/convert?url=${encodeURIComponent(url)}`
      },
      response: actions.addNewFeed
    }
  },

  addNewFeed: res => {
    console.log(res)
  },
}

export const reducer = (inputState = {}, action) => {
  const defaultState = {
    newFeedRequestState: 0,
    feeds: []
  }
  const initialState = update(defaultState, {$merge: inputState})

  return initialState
}
