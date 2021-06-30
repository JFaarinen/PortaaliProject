import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import tuoteReducer from './reducers/tuoteReducer';
import './index.css';

const store = createStore(tuoteReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>

  </Provider>,
  document.getElementById('root')
);

