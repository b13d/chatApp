import React, { useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { User } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
interface IUseContext {
  currentUser: User;
}
const Home = () => {
  const { currentUser }: IUseContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.displayName?.length === undefined) {
      navigate("/login");
    }
  }, [currentUser]);

  return (
    <div className="home">
      <div className="container max-[850px]:w-[90%] min-[851px]:w-[65%]">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
