import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import BackgroundCredits from "./components/BackgroundCredits.js";
ReactDOM.render(
  <React.StrictMode>
    <App />
    <BackgroundCredits />
  </React.StrictMode>,
  document.getElementById("root")
);
