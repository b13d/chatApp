import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyA4BzDCrQEaUWVkY3yLg5c9meVBHpM_wyM",
  authDomain: "chatapp-8d231.firebaseapp.com",
  projectId: "chatapp-8d231",
  storageBucket: "chatapp-8d231.appspot.com",
  messagingSenderId: "529307410147",
  appId: "1:529307410147:web:6d2cdc0d92a8325f3aafd6",
  measurementId: "G-KJ63MGE697",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
