// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTFM5ea-6AbzyuP0-3mhq9Sm6tJ5CQZeI",
  authDomain: "ai-price-compare.firebaseapp.com",
  projectId: "ai-price-compare",
  storageBucket: "ai-price-compare.firebasestorage.app",
  messagingSenderId: "23862110587",
  appId: "1:23862110587:web:9e7163e15a29f3870d35de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
