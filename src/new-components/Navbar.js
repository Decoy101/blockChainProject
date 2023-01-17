import { useEffect, useState } from "react";
import Web3 from "web3";
import { Link, useHistory, useLocation } from "react-router-dom";
import BESTX from "../media/BestX.svg";
import avatarImg from "../assets/images/avatar.svg"
import UserMenu from "./UserMenu";
import DepositDialog from "./DepositDialog";
import WithdrawDialog from "./WithdrawDialog";
import { useMetaMask } from "metamask-react";
import { ToastContainer, toast } from "react-toastify";
import { ToasterProperties } from "../utils/toaster";
import "react-toastify/dist/ReactToastify.css"

function Navbar({setPassLoading}) {
  // const { authenticate, isAuthenticated, logout } = useMoralis();
  const [walletAddress,setWalletAddress] = useState("");
  const [userMenu, setUserMenu] = useState(false);
  const [depositDialog, setDepositDialog] = useState(false);
  const [withdrawDialog, setWithdrawDialog] = useState(false);
  const [isConnected,setIsConnected] = useState(false);
  const {chainId} = useMetaMask();

  useEffect(()=>{
    getCurrentWalletConnected();
    addWalletListener();
  });
  useEffect(()=>{
    handleChainChange();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[chainId]);


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
    if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
      try{
        const accounts = await window.ethereum.request({method:"eth_accounts"});
        if(accounts.length > 0){
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
  const handleChainChange = async (reload) => {
    const currentChain = await window.ethereum.request({
      method: "eth_chainId",
    });

    if (currentChain !== "0x5") {
      setPassLoading(true);
      toast.warn("Switch to Goerli Test Network");

      try {
       await  window.ethereum
          .request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x5" }],
          })
          .then(() => {
            setPassLoading(false);
             window.location.reload(false);
          });
      }catch (e) {
        if(e.code===4001){
          window.location.reload(false);
        }
      }
    }
  };

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
      <ToastContainer autoClose={3000} position="top-left"/>
    </>
  );
}

export default Navbar;
