import React from "react";
import { Link } from "react-router-dom";
import BESTX from "../media/BestX.svg";
import Banner from "./Banner";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";
import WalletModal from "./WalletModal";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { ethers, providers } from "ethers";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import BestX from "../web3/BestX.json";
import { bestxAddress } from "../../config-keys";
// import { disconnect } from "process";

function NavBar({
  web3Modal,
  setWeb3Modal,
  connected,
  setConnected,
  contract,
  setContract,
}) {
  const styles = {
    connectWallet: {
      padding: "5px 20px",
      textDecoration: "none",
      fontSize: "18px",
      border: "1px solid #FFFFFF",
      borderRadius: "5px",
      margin: "28px",
      background: "transparent",
      position: "relative",
    },
    connectWallet0: {
      padding: "5px 20px",
      textDecoration: "none",
      fontSize: "18px",
      border: "none",
      borderRadius: "5px",
      margin: "28px",
      background: "transparent",
      position: "relative",
    },
  };

  // const [web3Modal, setWeb3Modal] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [refresh, setRefresh] = useState(true);
  // const [contract, setContract] = useState(null);
  const [totalBalance, setTotalBalance] = useState("");

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "dce86a2c13994bc090f708f217c5824a", // required
        },
      },
      binancechainwallet: {
        package: true,
      },
      coinbasewallet: {
        package: CoinbaseWalletSDK, // Required
        options: {
          appName: "BestX", // Required
          infuraId: "dce86a2c13994bc090f708f217c5824a", // Required
          rpc: "", // Optional if `infuraId` is provided; otherwise it's required
          chainId: 3, // Optional. It defaults to 1 if not provided
          darkMode: true, // Optional. Use dark theme, defaults to false
        },
      },
    };
    const newWeb3Modal = new Web3Modal({
      network: "ropsten",
      cacheProvider: true, // optional
      providerOptions, // required
      // disableInjectedProvider: false,
      theme: {
        background: "#2A2A2A",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "#031014",
      },
    });
    setWeb3Modal(newWeb3Modal);
  }, []);

  useEffect(() => {
    // connect automatically and without a popup if user is already connected
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [web3Modal]);

  async function addListeners(web3ModalProvider) {
    web3ModalProvider.on("accountsChanged", (accounts) => {
      window.location.reload();
    });

    // Subscribe to chainId change
    web3ModalProvider.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    web3ModalProvider.on("disconnect", (error) => {
      console.log(error, "disconnected");
      window.location.reload();
    });
  }

  async function connectWallet() {
    try {
      await web3Modal.clearCachedProvider();
      const provider = await web3Modal.connect();
      console.log("provider", provider);
      await addListeners(provider);
      const ethersProvider = new providers.Web3Provider(provider);
      const userAddress = await ethersProvider.getSigner().getAddress();
      const totalBigUserBalance = await ethersProvider.getSigner().getBalance();
      const totalUserBalance = ethers.utils.formatUnits(
        totalBigUserBalance.toString(),
        "ether"
      );
      const signer = await ethersProvider.getSigner();
      const bestx = new ethers.Contract(bestxAddress, BestX.abi, signer);
      const bigUserBalance = await bestx.getMyBalance();
      const userBalance = bigUserBalance.toString();

      setAddress(userAddress);
      setBalance(userBalance);
      setConnected(true);
      setContract(bestx);
      setTotalBalance(totalUserBalance);
    } catch {
      window.location.reload();
    }
  }

  function openExploreModal3() {
    let exploreNavModalID3 = document.getElementById("exploreNavModalID3");
    let dropDownMenu = document.getElementById("dropDownMenu");

    exploreNavModalID3.style.display === "block"
      ? (exploreNavModalID3.style.display = "")
      : (exploreNavModalID3.style.display = "block");

    document.addEventListener("click", function (event) {
      var isClickInside = exploreNavModalID3.contains(event.target);
      var isClickInside0 = dropDownMenu.contains(event.target);

      if (!isClickInside && !isClickInside0) {
        exploreNavModalID3.style.display = "";
      }
    });
  }

  console.log("web3Modal", web3Modal || "NOTHING");
  console.log("bestXContractNavBar", contract);
  console.log(
    "getcontractbalanceSigner",
    contract?.provider.getSigner().getBalance()
  );

  return (
    <div>
      <nav className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">
            <Link to="/">
              <img src={BESTX} alt="" />
            </Link>
          </div>
        </div>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <div className="nav-links">
          <Link to="/Explore">EXPLORE</Link>
          <Link to="/Rankings">RANKINGS</Link>
          <Link to="/Create">+ CREATE</Link>
          {/* <button onClick={() => setRefresh(!refresh)}>Refresh</button> */}
          {connected ? (
            <button
              id="dropDownMenu"
              onClick={openExploreModal3}
              style={styles.connectWallet0}
            >
              <div className="walletButtonAvatar">
                <div className="walletButtonAvatarText">
                  <FaUser />
                </div>
              </div>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="exploreChevron exploreChevron1"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
          ) : (
            <button style={styles.connectWallet} onClick={connectWallet}>
              <span>
                CONNECT WALLET
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="exploreChevron exploreChevron1"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
          )}
        </div>
      </nav>
      <Banner />
      <DepositModal contract={contract} totalBalance={totalBalance} />
      <WithdrawModal contract={contract} />
      <WalletModal
        address={address}
        balance={balance}
        contract={contract}
        connected={connected}
        setConnected={setConnected}
      />
    </div>
  );
}

export default NavBar;
