import {createStore, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

// ui NewFeedText

// feeds

// timeline: [post]

import {
  reducer as fieldsReducer
} from './fields'

const reducer = combineReducers({
  fields: fieldsReducer
})

export default createStore(reducer, composeWithDevTools())
