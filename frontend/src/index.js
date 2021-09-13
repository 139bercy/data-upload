import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import httpInterceptor from './services/interceptor';

import axios from 'axios'
axios.defaults.baseURL = '/data-upload';

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});
httpInterceptor(history);

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
