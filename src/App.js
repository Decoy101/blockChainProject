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


function App() {
  const [passLoading,setPassLoading] = useState(false)


  const styles = {
    content: {
      fontFamily: "Roboto, sans-serif",
    },
  };

  return (
    <>
      <div className="relative">
        <Navbar setPassLoading = {setPassLoading}/>
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
    </>
  );
}

export default App;
