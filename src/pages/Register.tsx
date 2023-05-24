import React, { FormEvent, useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTask,
} from "firebase/storage";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { debug } from "console";

const Register = () => {
  const [err, setErr] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let tempFile = e.currentTarget.children[3] as HTMLInputElement;

    const displayName = (e.currentTarget.children[0] as HTMLInputElement).value;
    const email = (e.currentTarget.children[1] as HTMLInputElement).value;
    const password = (e.currentTarget.children[2] as HTMLInputElement).value;
    const file = tempFile.files![0]; // тут возможно ошибка

    console.log("displayName: " + displayName);
    console.log("email: " + email);
    console.log("password: " + password);
    console.log("file: " + file);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      console.log("1 ЭТАП ПРОШЕЛ");
      const storageRef = ref(storage, displayName);
      console.log("2 ЭТАП ПРОШЕЛ");
      const uploadTask = uploadBytesResumable(storageRef, file);
      console.log("3 ЭТАП ПРОШЕЛ");

      uploadTask.on(
        "state_changed", null,
        (error) => {
          console.log("Error upload file", error);
          setErr(true);
        },
        () => {
          console.log("4 ЭТАП НАЧАЛСЯ");
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            console.log("4 ЭТАП ПРОШЕЛ");
            await addDoc(collection(db, "users"), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            console.log("5 ЭТАП ПРОШЕЛ");
          });
        }
      );
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="img-file" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
  );
};

export default Register;
