import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

function WithdrawModal({ contract }) {
  const styles = {
    someStyle: {
      margin: "28px",
      background: "transparent",
    },
  };

  function openExploreModal7() {
    let withdrawModal = document.getElementById("withdrawModal");
    withdrawModal.style.display === "flex"
      ? (withdrawModal.style.display = "")
      : (withdrawModal.style.display = "flex");
  }

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

  async function withdraw() {
    try {
      await contract.withdrawAll();
      window.location.reload();
      window.location.reload();
      // history.push("/Explore");
    } catch {
      // console.log("something wrong with withdraw")
    }
  }

  useEffect(() => {
    getMyBalance();
  }, [contract]);

  return (
    <div id="withdrawModal" className="modalBackground">
      <div className="depositView depositViewW">
        <div className="depositView0">
          <div className="depositFunds">
            WITHDRAW BALANCE
            <span className="depositViewClose">
              <button
                onClick={openExploreModal7}
                className="depositViewCloseButton"
                aria-label="Close Modal"
              >
                &times;
              </button>
            </span>
            <hr />
            <label className="fundingSourceLabel">{`Your current balance is: ${userBalance} WEI`}</label>
            <br />
            <br />
            <button
              id="makeWithdrawal"
              className="selectButton mintSubmit mintSubmit0 createFormZI"
              onClick={withdraw}
            >
              WITHDRAW FUNDS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawModal;
