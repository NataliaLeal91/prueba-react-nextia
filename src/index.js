import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';

import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router'

import reducers from './reducers';
import history from './history';

const store = createStore(reducers(history),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk 
    )
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);