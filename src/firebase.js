// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxz9qFJ63cXwYlFpyUuYlYcCpp5DEpWKM",
  authDomain: "todo-list-eeef2.firebaseapp.com",
  projectId: "todo-list-eeef2",
  storageBucket: "todo-list-eeef2.firebasestorage.app",
  messagingSenderId: "918610587271",
  appId: "1:918610587271:web:a7b33c9ca594893ddd5222",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
