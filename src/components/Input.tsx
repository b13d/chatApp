import React, { useContext, useState, useRef, useEffect } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const refInputText = useRef<HTMLInputElement>(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (
      (refInputText.current !== null &&
        refInputText.current.value.trim().length > 0) ||
      img
    ) {
      let inputText = text;
      setText("");
      console.log(inputText);

      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        // console.log(storage);
        // console.log(storageRef);
        // console.log(uploadTask);

        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.log("Error upload file", error);
            // setErr(true);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text: inputText,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
              }
            );
          }
        );
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: inputText,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text: inputText,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text: inputText,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      setImg(null);
      // refInputText.current !== null ? refInputText.current.value = "" : "";
    } else {
      // refInputText.current !== null ? refInputText.current.value = "" : "";
      alert("Пустое сообщение");
    }
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleSend();
    }
  };

  console.log(img);
  return (
    <div className="px-2 input h-[50px] max-[850px]:h-[40px]">
      <input
        maxLength={200}
        onKeyPress={(e) => handleKeypress(e)}
        ref={refInputText}
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="sm:w-[70%] w-[40%] max-sm:text-[12px]"
      />
      <div className="send">
        {/* <img className="max-sm:hidden" src={Attach} alt="" /> */}
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) =>
            setImg(e.target.files !== null ? e.target.files[0] : null)
          }
        />
        <label className="relative w-[24px]" htmlFor="file">
          <img src={Img} alt="" />
          {img !== null && img !== undefined && (
            <span className="absolute bg-red-600 rounded-full text-white w-[25px] pt-[2px] h-[25px] text-center  text-[12px]  bottom-3 font-bold left-3">
              +1
            </span>
          )}
        </label>
        <button
          className="py-[10px] px-[15px] max-[850px]:py-[6px] max-[850px]:px-[8px] rounded-md"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
