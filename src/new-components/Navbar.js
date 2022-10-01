import { Link } from "react-router-dom";
import BESTX from "../media/BestX.svg";

function Navbar() {
  return (
    <>
      <nav className="mx-48 my-16 flex justify-between">
        <Link to="/">
          <img src={BESTX} alt="Bextx Logo" />
        </Link>
        <div className="flex">
          <Link className="mr-6 text-2xl" to="/Explore">Explore</Link>
          <Link className="mr-6 text-2xl" to="/Rankings">Rankings</Link>
          <Link className="mr-6 text-2xl" to="/Create">+Create</Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
