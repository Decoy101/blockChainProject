import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Link, useHistory, useLocation } from "react-router-dom";
import BESTX from "../media/BestX.svg";
import avatarImg from "../assets/images/avatar.svg"
import UserMenu from "./UserMenu";

function Navbar() {
  const { authenticate, isAuthenticated, isAuthenticating, logout } = useMoralis();
  const [userMenu, setUserMenu] = useState(false);
  const history = useHistory();
  const location = useLocation()

  useEffect(() => {
    if (isAuthenticated) {

      // add your logic here
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setUserMenu(false);
  }, [location]);

  const login = async () => {
    if (!isAuthenticated) {

      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(async function (user) {
          const isUsernameUpdated = await user.get('isUsernameUpdated');
          if (!isUsernameUpdated)
            history.replace('/select-username')
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const logOut = async () => {
    setUserMenu(false)
    await logout();
    history.replace('/')
  }

  return (
    <>
      <nav className="mx-48 my-16 relative flex justify-between">
        <Link to="/">
          <img src={BESTX} alt="Bextx Logo" />
        </Link>

        {
          isAuthenticated ?
            <div className="flex">
              <Link className="mr-6 text-2xl" to="/Explore">Explore</Link>
              <Link className="mr-6 text-2xl" to="/Rankings">Rankings</Link>
              <Link className="mr-6 text-2xl" to="/Create">+Create</Link>
              <button onClick={() => setUserMenu(!userMenu)}><img className="w-8" src={avatarImg} alt="avatar" /></button>
            </div>
            :
            <div>
              <button className="mr-2 rounded-full bg-sky-500 px-8 py-2" onClick={login}>Sign In</button>
            </div>
        }
        {
          userMenu ? <UserMenu callbackOnLogout={logOut} /> : null
        }
      </nav>
    </>
  );
}

export default Navbar;
