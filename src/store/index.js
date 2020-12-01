import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import middleware from './middleware';
import { getInitialState } from './shape';
import reducer from './reducer';
import tasks from './tasks';

const store = createStore(
  reducer,
  getInitialState(),
  composeWithDevTools(middleware)
);

let currentState = getInitialState();
store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();

  tasks.forEach(task => {
    const action = task(currentState, previousState);
    if (action) store.dispatch(action);
  });
});

// setInterval(() => {
//   store.dispatch(timelineActions.debouncedCheckFeeds());
// }, config.FEED_CHECK_INTERVAL);

window.store = store;
export default store;
