import { applyMiddleware } from 'redux';
import reduxPopsicle from 'redux-popsicle';
import thunk from 'redux-thunk';

import KoalaMiddleware from './redux-koala';
// import scroll from './scroll';

const koalaMiddleware = KoalaMiddleware(process.env.KOALA_URI);

const middleware = applyMiddleware(thunk, reduxPopsicle, koalaMiddleware);

export default middleware;
