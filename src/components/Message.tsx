import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import moment from "moment";

const Message = ({ message }: any) => {
  // ANY ANY ANY

  console.log(message);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let tempRef = ref.current;

    tempRef && tempRef.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  console.log(message.date);

  let dataMessage = moment.unix(message.date.seconds).format("L");
  let timeMessage = moment.unix(message.date.seconds).format("LT");

  console.log(timeMessage);
  return (
    <div
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
        <span>{dataMessage}</span>
        <span>{timeMessage}</span>
      </div>
      <div className="messageContent">
        {message.text.length > 0 && <p>{message.text}</p>}
        {message.img && (
          <img style={{ maxHeight: "220px" }} src={message.img} alt="" />
        )}
      </div>
    </div>
  );
};

export default Message;
