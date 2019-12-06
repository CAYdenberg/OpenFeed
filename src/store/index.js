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
    if (task[0](currentState, previousState)) store.dispatch(task[1]);
  });
});

window.store = store;
export default store;
