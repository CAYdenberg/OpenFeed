import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import reduxPopsicle from 'redux-popsicle'

import createPouchMiddleware from './middleware/pouchdb'

import {
  reducer as fieldsReducer
} from './fields'

import {
  reducer as feedsReducer
} from './feeds'

const pouchMiddleware = createPouchMiddleware('pheed-default')

const reducer = combineReducers({
  fields: fieldsReducer,
  feeds: feedsReducer,
})

export default createStore(reducer, composeWithDevTools(
  applyMiddleware(reduxPopsicle, pouchMiddleware)
))
