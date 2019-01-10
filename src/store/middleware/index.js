import {applyMiddleware} from 'redux'
import reduxPopsicle from 'redux-popsicle'
import thunk from 'redux-thunk'

import KoalaMiddleware from './redux-koala'
import {actions as feedsActions} from '../feeds'
import {actions as postsActions} from '../posts'

const koalaMiddleware = KoalaMiddleware(
  [feedsActions.loadFeeds, postsActions.load],
  process.env.KOALA_URI
)

export default applyMiddleware(reduxPopsicle, koalaMiddleware, thunk)
