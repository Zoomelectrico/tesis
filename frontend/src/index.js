import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/css/argon-dashboard-react.css";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

serviceWorker.register();
