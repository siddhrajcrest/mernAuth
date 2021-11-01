import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useDispatch } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import provider, { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducers from './Reducers';
import getpost from './actions/posts';

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
<App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();