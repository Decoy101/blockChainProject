import React, { useState, useEffect } from "react";
import { ethers, providers } from "ethers";
import { useHistory } from "react-router-dom";

function DepositModal({ contract }) {
  console.log("depositContract", contract);

  const [userAddress, setUserAddress] = useState(null);
  const [totalBalance, setTotalBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const history = useHistory();

  function openExploreModal6() {
    let depositModal = document.getElementById("depositModal");
    depositModal.style.display === "flex"
      ? (depositModal.style.display = "")
      : (depositModal.style.display = "flex");
  }

  function handleTextAreaContent(e) {
    const {
      target: { name, value },
    } = e;
    setDepositAmount({ [name]: parseInt(value.replace(/[^\w\s]/gi, "")) });
    console.log(depositAmount);
  }

  async function processDeposit() {
    try {
      const _amount = depositAmount["Funding Source"];
      console.log("Deposit Processing!", _amount);
      const deposit = await contract.deposit({value: _amount})
      console.log("deposit depositmodal", deposit)
    } catch {
      console.log("something wrong with deposit");
    }
    window.location.reload();
    window.location.reload();

  }

  async function getMyAddress() {
    try {
      const address = await contract.getMyAddress();
      setUserAddress(address);
    } catch {
      // console.log("haven't gotten to the contract yet")
    }
  }

  async function getMyTotalBalance() {
    try {
      const tot = await contract.provider.getSigner().getBalance();
      const result = ethers.utils.formatUnits(tot.toString(), "ether");
      setTotalBalance(result);
    } catch {
      // console.log("haven't gotten to the contract yet")
    }
  }

  useEffect(() => {
    getMyAddress();
    getMyTotalBalance();
  }, [contract]);

  console.log("result", totalBalance);

  return (
    <div id="depositModal" className="modalBackground">
      <div className="depositView">
        <div className="depositView0">
          <div className="depositFunds">
            DEPOSIT FUNDS
            <span className="depositViewClose">
              <button
                onClick={openExploreModal6}
                id="depositViewCloseButton"
                className="depositViewCloseButton"
                aria-label="Close Modal"
              >
                &times;
              </button>
            </span>
            <hr />
            <label className="fundingSourceLabel">Funding Source</label>
            <br />
            <input
              // placeholder="Metamask 02x4ce...16a3"
              placeholder={`${
                contract?.signer.provider.connection.url
              } ${userAddress?.slice(0, 6)}...${userAddress?.slice(-4)}`}
              className="fundingSourceInput"
              type="text"
              id="fundingSource"
              name="Funding Source"
            />
            <br />
            <label className="fundingSourceLabel">Select Amount</label>
            <br />
            <input
              placeholder="$0                                           USDC"
              className="fundingSourceInput"
              type="text"
              id="fundingSource"
              name="Funding Source"
              onChange={handleTextAreaContent}
            />
            <br />
            <br />
            <button
              id="makeDeposit"
              className="selectButton mintSubmit mintSubmit0 createFormZI"
              onClick={processDeposit}
            >
              MAKE DEPOSIT
            </button>
            {/* <label className="fundingSourceLabel0">{`Available Funds: ${totalBalance.slice(
              0,
              4
            )}
            ETH`}</label> */}
            <label className="fundingSourceLabel0">{`Available Funds: ${totalBalance} ETH`}</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepositModal;
