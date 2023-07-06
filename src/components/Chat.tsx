import React, { useContext, useEffect, useState } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { User } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { deleteField, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

// interface IUseContext {
//   data: User;
// }

interface IUserData {
  displayName: string | undefined;
  photoURL: string | undefined;
  uid: string | undefined;
}

const Chat = () => {
  const { data, dispatch } = useContext(ChatContext);
  const [tempSidebar, setTempSidebar] = useState<HTMLDivElement>();
  const [showMore, setShowMore] = useState<boolean>(false);

  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    let tempSidebar = document.querySelector(".sidebar") as HTMLDivElement;

    setTempSidebar(tempSidebar);
  }, []);

  useEffect(() => {
    window.addEventListener(
      "resize",
      function (event) {
        if (
          this.document.body.clientWidth > 850 &&
          tempSidebar?.style.display !== "block"
        ) {
          let tempSidebar = document.querySelector(
            ".sidebar"
          ) as HTMLDivElement;

          tempSidebar.style.display = "block";

          setTempSidebar(tempSidebar);
        }
      },
      true
    );
  }, []);

  console.log(currentUser);

  const handleChangeMenu = () => {
    if (tempSidebar !== undefined && tempSidebar !== null) {
      // console.log(tempSidebar);
      // console.log(tempSidebar.style.display);
      if (tempSidebar.style.display === "none")
        tempSidebar.style.display = "block";
      else tempSidebar.style.display = "none";
    }
  };

  const handleClickMore = () => {
    setShowMore(showMore === true ? false : true);
  };

  console.log(currentUser);
  console.log(data);

  const handleClearChat = async () => {
    const chatRef = doc(db, "chats", data.chatId);

    // Remove the 'capital' field from the document
    await updateDoc(chatRef, {
      messages: deleteField(),
    });
  };
  const handleDeleteChat = async () => {
    const userChatRef = doc(db, "userChats", currentUser.uid);

    let nameField = data.chatId;

    await updateDoc(userChatRef, {
      [nameField]: deleteField(),
    });

    await deleteDoc(doc(db, "chats", data.chatId));

    let clearUser: IUserData = {
      displayName: undefined,
      photoURL: undefined,
      uid: undefined,
    };

    dispatch({ type: "CHANGE_USER", payload: clearUser });
    // window.location.reload();
  };

  return (
    <div className="chat">
      <div className="chatInfo h-[50px] ">
        <div className="min-[850px]:hidden">
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
        </div>

        <span className="">{data.user?.displayName}</span>
        {data.user.displayName !== undefined && (
          <div onClick={() => handleClickMore()} className="relative chatIcons">
            <AnimatePresence initial={false}>
              {showMore && (
                <motion.div
                  key="motion"
                  initial={{ opacity: 0, y: -20, x: 20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{
                    opacity: 0,
                    y: -20,
                    x: 20,
                    transition: { duration: 0.5 },
                  }}
                  transition={{ type: "tween" }}
                  className="bg-[#e9e9e9] shadow-xl absolute right-1 flex flex-col max-[400px]:w-[150px]  w-[200px] h-[200px] top-9 z-50 rounded-md"
                >
                  <ul className="flex flex-col flex-1 py-2 px-2">
                    <li
                      onClick={() => {
                        handleClearChat();
                      }}
                      className="cursor-pointer  items-center duration-300 max-[400px]:text-[13px] sm:hover:bg-[#1f1f1f36] active:bg-[#1f1f1f36]  deleteText flex gap-2 w-full font-medium text-[#1b1b1b] h-[25%] "
                    >
                      Очистить чат
                    </li>
                    <li
                      onClick={() => {
                        handleDeleteChat();
                      }}
                      className="cursor-pointer  items-center duration-300 max-[400px]:text-[13px] sm:hover:bg-[#1f1f1f2d] active:bg-[#1f1f1f36] deleteChat flex gap-2 w-full font-medium text-[#1b1b1b] h-[25%] "
                    >
                      Удалить чат
                    </li>

                    <li className="w-full h-[25%] "></li>
                  </ul>
                </motion.div>
              )}
              {/* <img src={Cam} alt="" /> */}
              {/* <img src={Add} alt="" /> */}
              <img src={More} alt="more-icon" />
            </AnimatePresence>
          </div>
        )}
      </div>
      {data.user.displayName !== undefined ? (
        <Messages />
      ) : (
        <div className="chose-user min-[850px]:h-[calc(100%_-_50px)] h-[calc(100%_-_50px)] w-full flex justify-center items-center text-center bg-[#42424294]">
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
