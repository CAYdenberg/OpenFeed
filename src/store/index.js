import {
  createStore,
  applyMiddleware
} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import reduxPopsicle from 'redux-popsicle'
import SagaMiddleware from 'redux-saga'

import KoalaMiddleware from './middleware/redux-koala'
import rootSaga from './sagas'
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
import {
  reducer as errorsRedcuer,
} from './errors'

const reducer = combineReducers({
  newFeed: newFeedReducer,
  feeds: feedsReducer,
  posts: postsReducer,
  status: statusReducer,
  ui: uiReducer,
  errors: errorsRedcuer,
})

const koalaMiddleware = KoalaMiddleware(
  process.env.KOALA_URI
)

const sagaMiddleware = SagaMiddleware()

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(reduxPopsicle, koalaMiddleware, sagaMiddleware)
))

sagaMiddleware.run(rootSaga)

window.store = store

// const handleScroll = debounce(() => {
//   const postsList = document.querySelectorAll('.post')
//   const scrollPosition = window.scrollY
//   // find first post with a positive value or null if none
//   store.dispatch(updateScrollPosition(id of post))
// })

// window.addEventListener('scroll', handleScroll)

export default store
