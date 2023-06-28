import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [userName, setUsername] = useState("");
  const [user, setUser] = useState<User | DocumentData>();
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    setErr(false);

    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setUser(undefined);
        return setErr(true);
      }

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
      setUser(undefined);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // debugger
    const combinedId =
      user &&
      (currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });

        // create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user && user.uid,
            displayName: user && user.displayName,
            photoURL: user && user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user && user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser && currentUser.uid,
            displayName: currentUser && currentUser.displayName,
            photoURL: currentUser && currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(undefined);
    setUsername("");
  };

  console.log(user);

  return (
    <div className="search">
      <div className="searchForm max-sm:w-full">
        <div className="flex gap-1 items-start flex-col">
          <input
            className="w-full border-b-2 max-[500px]:text-[12px]"
            type="text"
            placeholder="Find a user"
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={userName}
          />
          <button
            onClick={handleSearch}
            className="text-[#050b44d2] font-semibold border px-1 max-[500px]:text-[12px] border-[#4c4a8df5] rounded-md"
          >
            search
          </button>
        </div>
        {err && (
          <span className="max-[500px]:text-[12px]">User not found!</span>
        )}
      </div>
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img
            className="h-[50px]"
            src={user.photoURL !== null ? user.photoURL : ""}
            alt=""
          />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
