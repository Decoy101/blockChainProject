import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "../src/components/ScrollToTop";
import ScrollToTop from "../src/components/ScrollToTop";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider serverUrl={process.env.REACT_APP_SERVER_URL} appId={process.env.REACT_APP_DAPP_ID}>
      <Router>
        <ScrollToTop />
        <App />
      </Router>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
