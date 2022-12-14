// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtA7aRBhz5BHXP7TubqCsK-iU9i1wHef4",
  authDomain: "asiwajuapp-9621f.firebaseapp.com",
  databaseURL: "https://asiwajuapp-9621f-default-rtdb.firebaseio.com",
  projectId: "asiwajuapp-9621f",
  storageBucket: "asiwajuapp-9621f.appspot.com",
  messagingSenderId: "1632856882",
  appId: "1:1632856882:web:29cc9faf0e51f5fd55452b",
  measurementId: "G-4CD3NGY9QL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);