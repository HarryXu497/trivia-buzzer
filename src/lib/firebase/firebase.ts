// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPEjYYEnRE8LsnnawEycIVCOK95PySDPw",
  authDomain: "trivia-buzzer-2a1a0.firebaseapp.com",
  projectId: "trivia-buzzer-2a1a0",
  storageBucket: "trivia-buzzer-2a1a0.appspot.com",
  messagingSenderId: "968544002821",
  appId: "1:968544002821:web:10bc77a978c9e486c0cd6c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;