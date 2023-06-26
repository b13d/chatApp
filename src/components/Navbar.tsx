import { signOut } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleExitUser = () => {
    setCurrentUser(false);
  };


  return (
    <div className="navbar">
      <span className="logo">Lama chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>
          <Link
            onClick={() => {
              handleExitUser();
            }}
            style={{ textDecoration: "none", color: "lightgray" }}
            to="/login"
          >
            logout
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
