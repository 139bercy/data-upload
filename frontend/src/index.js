import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import axios from 'axios';

import App from "./App";
import * as serviceWorker from "./serviceWorker";

const history = createBrowserHistory();
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401 || error.response.status === 403) {
      history.push('/login');
  }
  return Promise.reject(error);
})


ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
