import "react-toastify/dist/ReactToastify.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import BESTX from "../media/BestX.svg";
import UserMenu from "./UserMenu";

function Navbar() {
  // const { authenticate, isAuthenticated, logout } = useMoralis();
  // const [walletAddress,setWalletAddress] = useState("");
  // const [userMenu, setUserMenu] = useState(false);
  // const [depositDialog, setDepositDialog] = useState(false);
  // const [withdrawDialog, setWithdrawDialog] = useState(false);
  // const [isConnected,setIsConnected] = useState(false);
  // const {chainId} = useMetaMask();

  // useEffect(()=>{
  //   getCurrentWalletConnected();
  //   addWalletListener();
  // });
  // useEffect(()=>{
  //   handleChainChange();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[chainId]);

  // const onConnect = async() =>{
  //   try{
  //     if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
  //       try{
  //         const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
  //         console.log(accounts[0]);
  //         setWalletAddress(accounts[0]);
  //         setIsConnected(true);
  //       }catch(err){
  //         console.log(err)
  //       }
  //     } else{
  //       console.log("Please install Metamask")
  //     }
  //   }
  //   catch(err){
  //     console.log(err)
  //   }
  // }
  // const onDisconnect = ()=>{
  //   setIsConnected(false);
  //   setWalletAddress("");
  // }

  // const getCurrentWalletConnected = async()=>{
  //   if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
  //     try{
  //       const accounts = await window.ethereum.request({method:"eth_accounts"});
  //       if(accounts.length > 0){
  //         setWalletAddress(accounts[0]);
  //         setIsConnected(true);
  //       }else{
  //         console.log("Connect to MetaMask using the Connect Button");
  //       }
  //     }catch(err){
  //       console.log(err)
  //     }
  //   } else{
  //     console.log("Please install Metamask")
  //   }

  // }
  // const addWalletListener = async()=>{
  //   if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
  //     window.ethereum.on("accountsChanged",(accounts)=>{
  //       setWalletAddress(accounts[0]);
  //       setIsConnected(true);
  //     })
  //   } else{
  //     setWalletAddress("");
  //     setIsConnected(false);
  //     console.log("Please install Metamask")
  //   }
  // }
  // const handleChainChange = async (reload) => {
  //   const currentChain = await window.ethereum.request({
  //     method: "eth_chainId",
  //   });

  //   if (currentChain !== "0x5") {
  //     setPassLoading(true);
  //     toast.warn("Switch to Goerli Test Network");

  //     try {
  //      await  window.ethereum
  //         .request({
  //           method: "wallet_switchEthereumChain",
  //           params: [{ chainId: "0x5" }],
  //         })
  //         .then(() => {
  //           setPassLoading(false);
  //            window.location.reload(false);
  //         });
  //     }catch (e) {
  //       if(e.code===4001){
  //         window.location.reload(false);
  //       }
  //     }
  //   }
  // };

  // const handleOpenDepositDialog = () => {
  //   setUserMenu(false)
  //   setDepositDialog(true)
  // }

  // const handleOpenWithdrawDialog = () => {
  //   setUserMenu(false)
  //   setWithdrawDialog(true)
  // }

  return (
    <>
      <nav className="mx-48 my-16 relative flex justify-between items-center">
        <Link to="/">
          {/* <img src={BESTX} alt="Bestx Logo" /> */}
          <p>Home</p>
        </Link>
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === "authenticated");

            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        className="flex items-center rounded-3xl bg-yellow-400 text-white w-fit px-5 py-3 hover:scale-105"
                        onClick={openConnectModal}
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 mr-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                          />
                        </svg>
                        Sign Up
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button onClick={openChainModal} type="button">
                        Wrong network
                      </button>
                    );
                  }

                  return (
                    <>
                      <div className="flex">
                        <div className="mr-4">
                          <Link className="mr-6 text-2xl" to="/Explore">
                            Explore
                          </Link>
                          <Link className="mr-6 text-2xl" to="/Rankings">
                            Rankings
                          </Link>
                          <Link className="mr-6 text-2xl" to="/Create">
                            +Create
                          </Link>
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                          <button
                            onClick={openChainModal}
                            style={{ display: "flex", alignItems: "center" }}
                            type="button"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 12,
                                  height: 12,
                                  borderRadius: 999,
                                  overflow: "hidden",
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? "Chain icon"}
                                    src={chain.iconUrl}
                                    style={{ width: 12, height: 12 }}
                                  />
                                )}
                              </div>
                            )}
                            {chain.name}
                          </button>

                          <button onClick={openAccountModal} type="button">
                            {account.displayName}
                            {account.displayBalance
                              ? ` (${account.displayBalance})`
                              : ""}
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </nav>
    </>
    // <>
    //   <nav className="mx-48 my-16 relative flex justify-between">
    //     <Link to="/">
    //       <img src={BESTX} alt="Bextx Logo" />
    //     </Link>

    //     {/* {
    //       walletAddress && isConnected ?
    //         <div className="flex">
    //           <Link className="mr-6 text-2xl" to="/Explore">Explore</Link>
    //           <Link className="mr-6 text-2xl" to="/Rankings">Rankings</Link>
    //           <Link className="mr-6 text-2xl" to="/Create">+Create</Link>
    //           <button onClick={() => setUserMenu(!userMenu)}>Connected: {walletAddress.substring(0,6)}...{walletAddress.substring(38,40)}</button>
    //         </div>
    //         :

    //     } */}
    //     <div>

    //     </div>
    //     {
    //       userMenu ? <UserMenu callbackOnLogout={onDisconnect} closeUserMenu={() => setUserMenu(false)} openDepositDialog={handleOpenDepositDialog} openWithdrawDialog={handleOpenWithdrawDialog} /> : null
    //     }
    //     {depositDialog ? <DepositDialog callbackOnClose={() => setDepositDialog(false)} /> : null}
    //     {withdrawDialog ? <WithdrawDialog callbackOnClose={() => setWithdrawDialog(false)} /> : null}
    //   </nav>

    // </>
  );
}

export default Navbar;
