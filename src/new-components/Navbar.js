import { useEffect, useState } from "react";
import Web3 from "web3";
import { Link, useHistory, useLocation } from "react-router-dom";
import BESTX from "../media/BestX.svg";
import avatarImg from "../assets/images/avatar.svg"
import UserMenu from "./UserMenu";
import DepositDialog from "./DepositDialog";
import WithdrawDialog from "./WithdrawDialog";

function Navbar() {
  // const { authenticate, isAuthenticated, logout } = useMoralis();
  const [walletAddress,setWalletAddress] = useState("");
  const [userMenu, setUserMenu] = useState(false);
  const [depositDialog, setDepositDialog] = useState(false);
  const [withdrawDialog, setWithdrawDialog] = useState(false);
  const history = useHistory();
  const location = useLocation()
  const [isConnected,setIsConnected] = useState(false);
  useEffect(()=>{
    getCurrentWalletConnected();
    addWalletListener();
  });


  const onConnect = async() =>{
    try{
      if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
        try{
          const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
          console.log(accounts[0]);
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        }catch(err){
          console.log(err)
        }
      } else{
        console.log("Please install Metamask")
      }
    }
    catch(err){
      console.log(err)
    }
  }
  const onDisconnect = ()=>{
    setIsConnected(false);
    setWalletAddress("");
  }

  const getCurrentWalletConnected = async()=>{
    if(isConnected === false){
      console.log("Press Connect")
    }
    else{
      try{
        if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
          try{
            const accounts = await window.ethereum.request({method:"eth_accounts"});
            if(accounts.length > 0){
              console.log(accounts[0]);
              setWalletAddress(accounts[0]);
              setIsConnected(true);
            }else{
              console.log("Connect to MetaMask using the Connect Button");
            }
          }catch(err){
            console.log(err)
          }
        } else{
          console.log("Please install Metamask")
        }
      }
      catch(err){
        console.log(err)
      }
    }


    
  }
  const addWalletListener = async()=>{
    if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
      window.ethereum.on("accountsChanged",(accounts)=>{
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      })
    } else{
      setWalletAddress("");
      setIsConnected(false);
      console.log("Please install Metamask")
    }
  }

  const handleOpenDepositDialog = () => {
    setUserMenu(false)
    setDepositDialog(true)
  }

  const handleOpenWithdrawDialog = () => {
    setUserMenu(false)
    setWithdrawDialog(true)
  }

  return (
    <>
      <nav className="mx-48 my-16 relative flex justify-between">
        <Link to="/">
          <img src={BESTX} alt="Bextx Logo" />
        </Link>

        {
          walletAddress && isConnected ?
            <div className="flex">
              <Link className="mr-6 text-2xl" to="/Explore">Explore</Link>
              <Link className="mr-6 text-2xl" to="/Rankings">Rankings</Link>
              <Link className="mr-6 text-2xl" to="/Create">+Create</Link>
              <button onClick={() => setUserMenu(!userMenu)}>Connected: {walletAddress.substring(0,6)}...{walletAddress.substring(38,40)}</button>
            </div>
            :
            <div>
              <button className="mr-2 rounded-full bg-sky-500 px-8 py-2" onClick={onConnect}>Sign In</button>
            </div>
        }
        {
          userMenu ? <UserMenu callbackOnLogout={onDisconnect} closeUserMenu={() => setUserMenu(false)} openDepositDialog={handleOpenDepositDialog} openWithdrawDialog={handleOpenWithdrawDialog} /> : null
        }
        {depositDialog ? <DepositDialog callbackOnClose={() => setDepositDialog(false)} /> : null}
        {withdrawDialog ? <WithdrawDialog callbackOnClose={() => setWithdrawDialog(false)} /> : null}
      </nav>
    </>
  );
}

export default Navbar;
