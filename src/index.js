import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "../src/components/ScrollToTop";
import ScrollToTop from "../src/components/ScrollToTop";
import { MetaMaskProvider } from "metamask-react";





ReactDOM.render(
  <React.StrictMode>
    <Router>
        <ScrollToTop />
        <App />
    </Router>
    
  </React.StrictMode>,
  document.getElementById("root")
);
