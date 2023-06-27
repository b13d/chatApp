import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import moment from "moment";
import { motion } from "framer-motion";

const Message = ({ message }: any) => {
  // ANY ANY ANY

  // console.log(message);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let tempRef = ref.current;

    tempRef && tempRef.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // console.log(message.date);

  let dataMessage = moment.unix(message.date.seconds).format("L");
  let timeMessage = moment.unix(message.date.seconds).format("LT");

  const variants = {
    hover: {
      opacity: 1,
    },
  };

  // console.log(timeMessage);
  return (
    <motion.div
      style={{ position: "relative" }}
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <motion.span
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
        </motion.span>
      </div>
      <div className="messageContent">
        {message.text.length > 0 && <p>{message.text}</p>}
        {message.img && (
          <img
            style={{ maxHeight: "220px", borderRadius: "20px" }}
            src={message.img}
            alt=""
          />
        )}
      </div>
    </motion.div>
  );
};

export default Message;
