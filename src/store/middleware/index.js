import {applyMiddleware} from 'redux'
import reduxPopsicle from 'redux-popsicle'
import thunk from 'redux-thunk'

import KoalaMiddleware from './redux-koala'
import {actions as feedsActions} from '../feeds'

const koalaMiddleware = KoalaMiddleware([feedsActions.loadFeeds], 'http://localhost:5000')

export default applyMiddleware(reduxPopsicle, koalaMiddleware, thunk)
