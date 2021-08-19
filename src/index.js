import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import store from './ReduxStore.js'

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={ store }>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>
  ,
  document.getElementById( 'root' )
);
