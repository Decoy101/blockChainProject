import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";

function WalletModal({ contract, setConnected }) {
  const [userAddress, setUserAddress] = useState(null);
  const [userBalance, setUserBalance] = useState(0);
  const history = useHistory();

  async function getMyBalance() {
    try {
      const balance = await contract.getMyBalance();
      setUserBalance(balance);
    } catch {
      // console.log("haven't gotten to the contract yet")
    }
  }

  async function getMyAddress() {
    try {
      const address = await contract.getMyAddress();
      setUserAddress(address);
    } catch {
      // console.log("haven't gotten to the contract yet")
    }
  }

  useEffect(() => {
    getMyBalance();
    getMyAddress();
  }, [contract]);

  function openExploreModal4() {
    let depositModal = document.getElementById("depositModal");
    depositModal.style.display === "flex"
      ? (depositModal.style.display = "")
      : (depositModal.style.display = "flex");
  }

  function openExploreModal5() {
    let withdrawModal = document.getElementById("withdrawModal");
    withdrawModal.style.display === "flex"
      ? (withdrawModal.style.display = "")
      : (withdrawModal.style.display = "flex");
  }

  function openExploreModal6() {
    setConnected(false);
    console.log("logged out");
    history.push("/Explore");
    // window.location.reload();
  }

  return (
    <>
      <div>
        <form id="exploreNavModalID3" className="exploreNavModal modalShift3">
          <div className="logoutDiv">
            <span>
              {/* {`${balance.slice(0, 4)} ETH`}{" "} */}
              {`${userAddress?.slice(0, 6)}...${userAddress?.slice(-4)}`}
            </span>
            <span className="logoutSpan">
              {/* You can add the logOut() function here on click after you make it a button */}
              <button
                onClick={openExploreModal6}
                className="uSpacing"
                type="button"
              >
                <u>Log out</u>
              </button>
            </span>
          </div>
          <br />
          <hr className="exploreModalHr" />
          <br />
          <div className="balanceAlign">BALANCE</div>
          <br />
          <div className="balanceAlign balanceAlign0">{`${userBalance} WEI`}</div>
          <br />
          <div className="modalShift4">
            <button
              onClick={openExploreModal4}
              className="uSpacing"
              type="button"
            >
              <u>deposit</u>
            </button>{" "}
            <button
              onClick={openExploreModal5}
              className="uSpacing"
              type="button"
            >
              <u>withdraw</u>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default WalletModal;
