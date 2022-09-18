import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Explore from "./components/Explore.js";
import Rankings from "./components/Rankings";
import Create from "./components/Create";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import About from "./components/About";
import FAQs from "./components/FAQs";
import Home from "./components/Home";
import ConnectWallet from "./components/ConnectWallet";
import "./App.css";
import Homepage from "./pages/Homepage.js";

function App() {
  const styles = {
    content: {
      display: "flex",
      justifyContent: "center",
      fontFamily: "Roboto, sans-serif",
      marginTop: "130px",
    },
  };

  const [web3Modal, setWeb3Modal] = useState(null);
  const [connected, setConnected] = useState(false);
  const [contract, setContract] = useState(null);

  return (
    <>
      <div>
        <NavBar
          web3Modal={web3Modal}
          setWeb3Modal={setWeb3Modal}
          connected={connected}
          setConnected={setConnected}
          contract={contract}
          setContract={setContract}
        />

        <div className="bestx">
          BEST
          <div style={{ color: "#F1BC33", position: "relative", zIndex: -1 }}>
            X
          </div>
        </div>
        <div style={styles.content}>
          <Switch>
            <Route path="/Explore">
              <Explore
                contract={contract}
                setContract={setContract}
                web3Modal={web3Modal}
                setWeb3Modal={setWeb3Modal}
                connected={connected}
                setConnected={setConnected}
              />
            </Route>
            <Route path="/Rankings">
              <Rankings />
            </Route>
            <Route path="/Create">
              <Create
                web3Modal={web3Modal}
                setWeb3Modal={setWeb3Modal}
                connected={connected}
                setConnected={setConnected}
                contract={contract}
                setContract={setContract}
              />
            </Route>
            <Route path="/ConnectWallet">
              <ConnectWallet />
            </Route>
            <Route path="/About">
              <About />
            </Route>
            <Route path="/FAQs">
              <FAQs />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
