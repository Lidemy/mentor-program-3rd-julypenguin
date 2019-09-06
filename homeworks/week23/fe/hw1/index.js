import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import App from './App';
import navReducer from './reducer';

const reducers = combineReducers({
  nav: navReducer,
});

const store = createStore(reducers);

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'),
);
