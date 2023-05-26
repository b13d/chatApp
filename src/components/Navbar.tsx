import { signOut } from "firebase/auth";
import React, {useContext} from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className="navbar">
      <span className="logo">Lama chat</span>
      <div className="user">
        <img
          src={currentUser.photoURL}
          alt=""
        />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>
          <Link style={{ textDecoration: "none", color: "lightgray" }} to="/login">
            logout
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
