import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
// import App from './components';
import './helpers/immutability';

ReactDOM.render(
  <Provider store={store}>
    <h1>Hello world</h1>
    {/* <App /> */}
  </Provider>,
  document.getElementById('root')
);

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  window.__REDUX_DEVTOOLS_EXTENSION__();
}
