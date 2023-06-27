import React, { useContext, useEffect, useState } from "react";
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
  const [tempSidebar, setTempSidebar] = useState<HTMLDivElement>();

  useEffect(() => {
    let tempSidebar = document.querySelector(".sidebar") as HTMLDivElement;

    setTempSidebar(tempSidebar);
  }, []);

  const handleChangeMenu = () => {
    if (tempSidebar !== undefined) {
      console.log(tempSidebar);
      console.log(tempSidebar.style.display);
      if (tempSidebar.style.display === "none")
        tempSidebar.style.display = "block";
      else tempSidebar.style.display = "none";
    }
  };
  return (
    <div className="chat">
      <div className="chatInfo h-[50px] ">
        <input
          onChange={handleChangeMenu}
          className="checkbox"
          type="checkbox"
          name=""
          id=""
        />
        <div className="hamburger-lines w-[32px] h-[26px] max-[850px]:w-[22px] top-[13px] max-[850px]:top-[15px] max-[850px]:h-[18px]">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <span className="ml-[50px]">{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      {data.user.displayName !== undefined ? (
        <Messages />
      ) : (
        <div className="chose-user min-[850px]:h-[calc(100%_-_50px)] h-[calc(100%_-_20px)] w-full flex justify-center items-center text-center bg-[#42424294]">
          <h1 className="text-[#d5e9fb]  text-3xl" style={{ margin: 0 }}>
            Выберите пользователя
          </h1>
        </div>
      )}
      {data.user.displayName !== undefined ? <Input /> : ""}
    </div>
  );
};

export default Chat;
