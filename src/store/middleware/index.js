import {applyMiddleware} from 'redux'
import reduxPopsicle from 'redux-popsicle'

import createPouchMiddleware from './pouchdb'

const pouchMiddleware = createPouchMiddleware('pheed-default')

export default applyMiddleware(reduxPopsicle, pouchMiddleware)
