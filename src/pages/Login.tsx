import React, { useState, useContext, useEffect } from "react";
import Add from "../img/addAvatar.png";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

interface IUseContext {
  currentUser: User;
}

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const { currentUser }: IUseContext = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = (e.currentTarget.children[0] as HTMLInputElement).value;
    const password = (e.currentTarget.children[1] as HTMLInputElement).value;

    console.log(email);
    console.log(password);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  useEffect(() => {
    if (
      currentUser.displayName?.length !== undefined &&
      currentUser.displayName.length > 0
    ) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [currentUser]);

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
