import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Link, useHistory } from "react-router-dom";
import BESTX from "../media/BestX.svg";

function Navbar() {
  const { authenticate, isAuthenticated, isAuthenticating, logout } = useMoralis();
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {

      // add your logic here
    }
  }, [isAuthenticated]);

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
    await logout();
    history.replace('/')
    console.log("logged out");
  }

  return (
    <>
      <nav className="mx-48 my-16 flex justify-between">
        <Link to="/">
          <img src={BESTX} alt="Bextx Logo" />
        </Link>

        {
          isAuthenticated ?
            <div className="flex">
              <Link className="mr-6 text-2xl" to="/Explore">Explore</Link>
              <Link className="mr-6 text-2xl" to="/Rankings">Rankings</Link>
              <Link className="mr-6 text-2xl" to="/Create">+Create</Link>
              <button onClick={logOut} disabled={isAuthenticating}>Logout</button>
            </div>
            :
            <div>
              <button className="mr-2 rounded-full bg-sky-500 px-8 py-2" onClick={login}>Sign In</button>
            </div>
        }
      </nav>
    </>
  );
}

export default Navbar;
