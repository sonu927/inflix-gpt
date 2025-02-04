// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1f-lDq9iLqm01tPjJQ9xY0__FVvqmkqc",
  authDomain: "inflix-gpt.firebaseapp.com",
  projectId: "inflix-gpt",
  storageBucket: "inflix-gpt.firebasestorage.app",
  messagingSenderId: "633345999260",
  appId: "1:633345999260:web:1fe7c8cf5149b10e8f4859",
  measurementId: "G-MGV8DF4M1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();