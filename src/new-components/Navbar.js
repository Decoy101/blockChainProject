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

  const [userMenu, setUserMenu] = useState(false);
  const [depositDialog, setDepositDialog] = useState(false);
  const [withdrawDialog, setWithdrawDialog] = useState(false);
  const history = useHistory();
  const location = useLocation()
  const [isConnected,setIsConnected] = useState(false);
  
  const detectProvider = ()=>{
    let provider;
    if(window.ethereum){
      provider = window.ethereum;
    }
    else if(window.web3){
      provider = window.web3.currentprovider;

    }
    else{
      console.log("Non ethereum browser detected. You should install Metamask");
    }
    return provider;
  };
  const onConnect = async() =>{
    try{
      const currentProvider = detectProvider();
      const web3  = new Web3(currentProvider);
      const useraccount = await web3.eth.getAccounts();
      const account = useraccount[0];
      setIsConnected(true);

    }
    catch(err){
      console.log(err)
    }
  }
  const onDisconnect = ()=>{
    setIsConnected(false);
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
          isConnected ?
            <div className="flex">
              <Link className="mr-6 text-2xl" to="/Explore">Explore</Link>
              <Link className="mr-6 text-2xl" to="/Rankings">Rankings</Link>
              <Link className="mr-6 text-2xl" to="/Create">+Create</Link>
              <button onClick={() => setUserMenu(!userMenu)}><img className="w-8" src={avatarImg} alt="avatar" /></button>
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
