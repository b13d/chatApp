import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { User } from "firebase/auth";

// interface IUseContext {
//   data: User;
// }

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <input className="checkbox" type="checkbox" name="" id="" />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      {data.user.displayName !== undefined ? (
        <Messages />
      ) : (
        <div className="chose-user">
          <h1 style={{ margin: 0 }}>Выберите пользователя</h1>
        </div>
      )}
      {data.user.displayName !== undefined ? <Input /> : ""}
    </div>
  );
};

export default Chat;
