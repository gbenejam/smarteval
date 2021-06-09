import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const protocol = window.location.protocol;
if (protocol && protocol.indexOf('http') >= 0) {
  // dev build
  axios.defaults.baseURL = 'http://localhost:3030/api';
} else {
  // prod build
  axios.defaults.baseURL = 'https://smarteval.herokuapp.com/api';
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
