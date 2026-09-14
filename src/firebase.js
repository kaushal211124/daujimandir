// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAkGmuT13E00fWs05-PR6VggAmQI5d3NOo",
    authDomain: "daujimandir-c8da7.firebaseapp.com",
    projectId: "daujimandir-c8da7",
    storageBucket: "daujimandir-c8da7.firebasestorage.app",
    messagingSenderId: "848943298837",
    appId: "1:848943298837:web:b91bd373408f094e71911c",
    measurementId: "G-BSN9E9H33S"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);