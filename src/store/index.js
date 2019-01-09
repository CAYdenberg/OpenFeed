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
import {
  reducer as statusReducer,
} from './status'
import {
  reducer as uiReducer,
} from './ui'

const reducer = combineReducers({
  newFeed: newFeedReducer,
  feeds: feedsReducer,
  posts: postsReducer,
  status: statusReducer,
  ui: uiReducer
})

const store = createStore(reducer, composeWithDevTools(middleware))

export default store
