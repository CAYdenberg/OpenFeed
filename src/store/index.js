import {createStore, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import middleware from './middleware'

import {
  reducer as newFeedReducer
} from './newFeed'

import {
  reducer as feedsReducer,
  actions as feedsActions,
} from './feeds'

const reducer = combineReducers({
  newFeed: newFeedReducer,
  feeds: feedsReducer,
})

const store = createStore(reducer, composeWithDevTools(middleware))

store.dispatch(feedsActions.loadFeeds())

export default store
