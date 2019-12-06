import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import middleware from './middleware';

import { combineReducers } from './shape';

import { reducer as system } from './system';

const reducer = combineReducers({ system });

const store = createStore(reducer, composeWithDevTools(middleware));

window.store = store;

export default store;
