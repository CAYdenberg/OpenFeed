import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import reduxPopsicle from 'redux-popsicle'

// ui NewFeedText

// feeds

// timeline: [post]

import {
  reducer as fieldsReducer
} from './fields'

import {
  reducer as feedsReducer
} from './feeds'

const reducer = combineReducers({
  fields: fieldsReducer,
  feeds: feedsReducer,
})

export default createStore(reducer, composeWithDevTools(
  applyMiddleware(reduxPopsicle)
))
