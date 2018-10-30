import update from 'immutability-helper'
import {wrapReducer} from './reduxHelpers'

const constants = {
  POPULATE: 'POSTS/POPULATE',
  POPULATE_OK: 'POSTS/POPULATE_OK',
  POPULATE_ERR: 'POSTS/POPULATE_ERR',
  LOAD: 'POSTS/LOAD',
  LOAD_OK: 'POSTS/LOAD_OK',
  LOAD_ERR: 'POSTS/LOAD_ERR'
}
const c = constants

const actions = {
  // populate: save feeds passed as action creator AND place them all in the timeline
  // (replacing the current contents of the timeline)
  // load: get feeds from the db and put them in the timeline
}

const reducer = wrapReducer({
  loadState: 0,
  posts: []
}, (initialState, action) => {

})
