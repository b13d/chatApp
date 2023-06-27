import { signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { storage } from "../firebase";
import {
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ChatContext } from "../context/ChatContext";

interface IUserData {
  displayName: undefined;
  photoURL: undefined;
  uid: undefined;
}

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [userSettings, setUserSettings] = useState(currentUser);
  const { dispatch } = useContext(ChatContext);

  const handleExitUser = async () => {
    let emptyFields: IUserData = {
      displayName: undefined,
      photoURL: undefined,
      uid: undefined,
    };
    dispatch({ type: "CHANGE_USER", payload: emptyFields });
    setCurrentUser(false);
  };

  const handleChangeImg = (newFile: React.ChangeEvent<HTMLInputElement>) => {
    let path: string = currentUser.displayName;
    const desertRef = ref(storage, path);

    let file = newFile.target.files;
    if (file !== null && newFile.target.value.trim().length > 0) {
      deleteObject(desertRef)
        .then(() => {
          if (file !== null) {
            uploadBytes(desertRef, file[0]).then((snapshot) => {
              getDownloadURL(ref(storage, path)).then((url) => {
                let tempUser = userSettings;
                tempUser.photoURL = url;

                setUserSettings(false);
                setTimeout(() => {
                  setUserSettings(tempUser);
                }, 500);

                console.log(url);
              });
            });
          }
        })
        .catch((error) => {});
    }
  };

  return (
    <div className="navbar max-sm:w-full">
      <span className="logo max-[1000px]:hidden">Lama chat</span>
      <div className="user flex items-center">
        <input
          onChange={(e) => handleChangeImg(e)}
          id="change-img"
          hidden
          type="file"
          accept="image/png, image/jpeg"
        />
        <label className="w-[24px] max-sm:hidden" htmlFor="change-img">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => handleChangeImg}
            src={userSettings.photoURL}
            alt=""
          />
        </label>
        <span className="max-sm:hidden">{userSettings.displayName}</span>
        <button className="px-3 py-1" onClick={() => signOut(auth)}>
          <Link
            onClick={() => {
              handleExitUser();
            }}
            style={{ textDecoration: "none", color: "lightgray" }}
            className="text-[16px]"
            to="/login"
          >
            logout
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
