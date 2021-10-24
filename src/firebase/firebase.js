
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs,doc,setDoc } from 'firebase/firestore';
import "firebase/database";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCApdaKdzz1IhNXH4bML3RPEBtUlKe2x34",
  authDomain: "masseging-3420b.firebaseapp.com",
  projectId: "masseging-3420b",
  storageBucket: "masseging-3420b.appspot.com",
  messagingSenderId: "1047864565974",
  appId: "1:1047864565974:web:46c2545d5a2eded1492977"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {getAuth,createUserWithEmailAndPassword,getFirestore, collection, getDocs,db,setDoc,doc}