import ReactDom from 'react-dom';
import React from 'react';
import { render } from 'react-dom';
import {Router, browserHistory} from 'react-router';
import App from './components/app.component';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

require('../scss/main.scss');


const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

ReactDom.render(
<Provider store={store}>
  <App  />
</Provider>, document.getElementById('react-app')
);
