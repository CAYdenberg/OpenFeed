import {
  applyMiddleware
} from 'redux'
import SagaMiddleware from 'redux-saga'
import reduxPopsicle from 'redux-popsicle'

import KoalaMiddleware from './redux-koala'
import scroll from './scroll'

const koalaMiddleware = KoalaMiddleware(
  process.env.KOALA_URI
)

export const sagaMiddleware = SagaMiddleware()

const middleware = applyMiddleware(reduxPopsicle, koalaMiddleware, sagaMiddleware, scroll)

export default middleware
