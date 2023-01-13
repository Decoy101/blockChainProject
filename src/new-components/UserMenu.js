import { useState } from "react";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";
import avatarImg from "../assets/images/avatar.svg"

function UserMenu(props) {
  // const { user } = useMoralis();
  const [userDetails, setUserDetails] = useState(null);
  const { callbackOnLogout, closeUserMenu } = props;



  return (
    <div className="absolute top-16 right-0 bg-gray-700 rounded-md w-96 p-4">
      <div className="flex">
        <div className="w-1/4">
          <img className="w-16" src={avatarImg} alt="avatar" />
        </div>
        <div className="w-3/4">
          <Link to="/profile"><p className="text-4xl">{userDetails?.username}</p></Link>
          <p className="text-gray-200">{userDetails?.ethAddress.slice(0, 4)}...{userDetails?.ethAddress.slice(-4)}</p>
          <Link className="text-gray-200 mr-6 text-2xl" to="/edit-profile">edit profile</Link>
        </div>
      </div>

      <hr className="my-4 border border-gray-400" />
      <div className="text-center my-12">
        <p className="mb-4">Balance</p>
        <p className="text-4xl mb-4">$1,234.56</p>
        <p>
          <button className="underline text-gray-200 mr-4" onClick={props.openDepositDialog}>deposit</button>
          <button className="underline text-gray-200" onClick={props.openWithdrawDialog}>withdraw</button>
        </p>
      </div>

      <hr className="my-4 border border-gray-400" />
      <p className="hover:cursor-pointer" onClick={()=>{callbackOnLogout();closeUserMenu();}} >Log out</p>

    </div>
  );
}

export default UserMenu;