import React, { useContext, useRef, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import moment from "moment";
import { motion } from "framer-motion";

const Message = ({ message }: any) => {
  // ANY ANY ANY

  // console.log(message);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [currentDate, setCurrentData] = useState<string>("");

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let tempRef = ref.current;
    tempRef && tempRef.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  let dataMessage = moment.unix(message.date.seconds).format("L");
  let timeMessage = moment.unix(message.date.seconds).format("LT");

  return (
    <motion.div
      style={{ position: "relative" }}
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          className="max-[425px]:hidden"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        {/* <motion.span
          variants={variants}
          initial={{
            textAlign:
              message.senderId === currentUser.uid && "owner"
                ? "right"
                : "left",
            opacity: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 0,
            top: 40,
          }}
          whileHover="hover"
          style={{ color: "white", fontSize: "12px" }}
        >
          {dataMessage} <br /> {timeMessage}
        </motion.span> */}
      </div>
      <div className="messageContent">
        {message.text.length > 0 && <p className="relative">{message.text}</p>}
        {message.img && (
          <img
            className="relative"
            style={{ maxHeight: "220px", borderRadius: "20px" }}
            src={message.img}
            alt=""
          />
        )}
        <motion.span
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          // variants={variants}
          initial={{
            textAlign:
              message.senderId === currentUser.uid && "owner"
                ? "right"
                : "left",
            opacity: 0,
            // width: "100%",
            // height: "100%",
            position: "relative",
            bottom: 0,
            // left: 0,
            // top: 40,
          }}
          style={{ color: "white", fontSize: "12px", fontWeight: 600 }}
        >
          {dataMessage} <br /> {timeMessage}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default Message;
