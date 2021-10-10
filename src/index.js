import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/profile.css";
import "./styles/style.css";
import "./styles/feed.css";
import en from "javascript-time-ago/locale/en.json";
import TimeAgo from "javascript-time-ago";
import axios from "axios";
import { BASEURL } from "./privates";

axios.defaults.baseURL = BASEURL;

// TimeAgo.addLocale(en);
TimeAgo.addDefaultLocale(en);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals())
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
