import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import httpInterceptor from './services/interceptor';

const history = createBrowserHistory();
httpInterceptor(history);

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
