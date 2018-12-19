import {
  createStore,
} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import middleware from './middleware'
import {combineReducers} from './reduxHelpers'
import {
  reducer as newFeedReducer
} from './newFeed'
import {
  reducer as feedsReducer
} from './feeds'
import {
  reducer as postsReducer,
} from './posts'

const reducer = combineReducers({
  newFeed: newFeedReducer,
  feeds: feedsReducer,
  posts: postsReducer
})

const store = createStore(reducer, composeWithDevTools(middleware))

export default store
