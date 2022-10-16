import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Create from "./pages/Create";
import Footer from "./components/Footer";
import About from "./components/About";
import FAQs from "./pages/FAQs";
import ConnectWallet from "./components/ConnectWallet";
import "./App.css";
import Homepage from "./pages/Homepage.js";
import Explore from "./pages/Explore";
import Navbar from "./new-components/Navbar";
import VideoDetail from "./pages/VideoDetail";
import Rankings from "./pages/Rankings";
import Profile from "./pages/Profile";

function App() {
  const styles = {
    content: {
      fontFamily: "Roboto, sans-serif",
    },
  };

  const [web3Modal, setWeb3Modal] = useState(null);
  const [connected, setConnected] = useState(false);
  const [contract, setContract] = useState(null);

  return (
    <>
      <div>
        {/* <NavBar
          web3Modal={web3Modal}
          setWeb3Modal={setWeb3Modal}
          connected={connected}
          setConnected={setConnected}
          contract={contract}
          setContract={setContract}
        /> */}
        <Navbar />
        <div style={styles.content} className="mx-48">
          <Switch>
            <Route path="/Explore">
              <Explore />
            </Route>
            <Route path="/Rankings">
              < Rankings />
            </Route>
            <Route path="/Create">
              <Create />
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
            <Route path="/video-details">
              <VideoDetail />
            </Route>
            <Route path="/profile">
              <Profile />
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
