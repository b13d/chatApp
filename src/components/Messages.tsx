import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { motion, useScroll, useMotionValue } from "framer-motion";

interface IMessageInfo {
  date: {nanoseconds: number, seconds: number};
  id: string;
  senderId: string;
  text: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<DocumentData>([]);
  const { data } = useContext(ChatContext);

  const { scrollYProgress } = useScroll();
  const y = useMotionValue(0);

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

  console.log();

  useEffect(() => {
    console.log(y);
    console.log(scrollYProgress);
  }, [scrollYProgress]);

  return (
    <motion.div
      style={{ y: scrollYProgress }}
      className="messages max-[850px]:h-[calc(100%_-_70px)] h-[calc(100%_-_100px)]"
    >
      {messages.map((m: IMessageInfo) => {
        return <Message {...m} key={m.id} />;
      })}
    </motion.div>
  );
};

export default Messages;
