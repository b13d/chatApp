import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Messages = () => {
  const [messages, setMessages] = useState<DocumentData>([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      const tempData = doc.data();
      if (tempData) {
        doc.exists() && setMessages(tempData.messages);
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);


  return (
    <div className="messages">
      {messages.map((m:any) => { // ANY ANY ANY
        return <Message message={m} key={m.id}/>;
      })}
    </div>
  );
};

export default Messages;
