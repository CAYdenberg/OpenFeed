import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import middleware, { sagaMiddleware } from './middleware';
import rootSaga from './sagas';

import { combineReducers } from './reduxHelpers';
import { reducer as newFeedReducer } from './newFeed';
import { reducer as feedsReducer } from './feeds';
import { reducer as postsReducer } from './posts';
import { reducer as statusReducer } from './status';
import { reducer as uiReducer } from './ui';
import { reducer as errorsRedcuer } from './errors';

const reducer = combineReducers({
  newFeed: newFeedReducer,
  feeds: feedsReducer,
  posts: postsReducer,
  status: statusReducer,
  ui: uiReducer,
  errors: errorsRedcuer,
});

const store = createStore(reducer, composeWithDevTools(middleware));

sagaMiddleware.run(rootSaga);

window.store = store;

export default store;
