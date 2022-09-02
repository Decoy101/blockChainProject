import React from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { ethers, providers } from "ethers";
import { useState, useEffect } from "react";

function ConnectWallet() {
  const styles = {
    content: {
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      background: "#141413",
      padding: "27px",
    },
    title: {
      color: "white",
    },
  };

  const [web3Modal, setWeb3Modal] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

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
      darkMode: true,
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
  }

  async function connectWallet() {
    await web3Modal.clearCachedProvider();
    const provider = await web3Modal.connect();
    await addListeners(provider);
    const ethersProvider = new providers.Web3Provider(provider);
    const userAddress = await ethersProvider.getSigner().getAddress();
    const bigUserBalance = await ethersProvider.getSigner().getBalance();
    const userBalance = ethers.utils.formatUnits(
      bigUserBalance.toString(),
      "ether"
    );
    setAddress(userAddress);
    setBalance(userBalance);
  }

  return (
    <>
      <div style={styles.content} className="container">
        <br />
        <br />
        <br />
        <div>
          <button onClick={connectWallet}>
            <h1>
              <strong style={styles.title}>CONNECT WALLET</strong>
            </h1>
          </button>
          <h1>{address}</h1>
          <h1>{balance}</h1>
        </div>
      </div>
    </>
  );
}

export default ConnectWallet;
