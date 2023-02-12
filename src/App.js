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
import EditProfile from "./pages/EditProfile";
import SelectUsername from "./pages/SelectUsername";


import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  midnightTheme,
  lightTheme
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, goerli, WagmiConfig, mainnet } from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [mainnet,goerli],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'BestX',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


const App = ()=> {
  const [passLoading,setPassLoading] = useState(false)
  const styles = {
    content: {
      fontFamily: "Roboto, sans-serif",
    },
  };

  return (
    <>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode chains={chains} theme={darkTheme({
      accentColor: '#7b3fe4',
      accentColorForeground: 'white',
      borderRadius: 'small',
      fontStack: 'system',
      overlayBlur: 'small',
    })}>
      <div className="relative">
        <Navbar/>
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
            <Route path="/edit-profile">
              <EditProfile />
            </Route>
            <Route path="/select-username">
              <SelectUsername />
            </Route>
            <Route path="/">
              <Homepage passLoading={passLoading} />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
      </RainbowKitProvider>
    </WagmiConfig>
      
    </>
  );
}

export default App;
