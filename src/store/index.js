import {createStore, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import middleware from './middleware'

import {
  reducer as fieldsReducer
} from './fields'

import {
  reducer as feedsReducer,
  actions as feedsActions,
} from './feeds'

const reducer = combineReducers({
  fields: fieldsReducer,
  feeds: feedsReducer,
})

const store = createStore(reducer, composeWithDevTools(middleware))

store.dispatch(feedsActions.loadFeeds())

export default store
