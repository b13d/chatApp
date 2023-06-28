import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { motion } from "framer-motion";
import { User } from "firebase/auth";

interface IUserData {
  displayName: string;
  photoURL: string;
  uid: string;
}

interface IUserChat {
  date: [seconds: number, nanoseconds: number];
  lastMessage: { text: string };
  userInfo: IUserData;
}

const Chats = () => {
  const [chats, setChats] = useState<DocumentData>([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch, data } = useContext(ChatContext);
  const [selectedUser, setSelectedUser] = useState<string>("");

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        const tempData = doc.data();
        if (tempData) setChats(tempData);
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = async (u: IUserData) => {
    // console.log(u);

    setSelectedUser(u.uid);
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <motion.div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat: [string, IUserChat]) => (
          <motion.div
            className={
              chat[1].userInfo.uid === selectedUser
                ? "userSelectedChat"
                : "userChat"
            }
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img className="w-[50px]  max-sm:w-[30px]" src={chat[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span className="max-sm:text-[14px] text-[18px]">{chat[1].userInfo.displayName}</span>
              <p style={{ margin: 0 }}>{chat[1].lastMessage?.text}</p>
            </div>
          </motion.div>
        ))}
    </motion.div>
  );
};

export default Chats;
