// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUyCrpXSOAKoGunROwxzlXxq7vUFMHios",
  authDomain: "spotyfier-dev.firebaseapp.com",
  projectId: "spotyfier-dev",
  storageBucket: "spotyfier-dev.appspot.com",
  messagingSenderId: "48695577124",
  appId: "1:48695577124:web:7234d1b6f1c359dfb866b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export default app