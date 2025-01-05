// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv0TAPwDIsbf82rFKII3DReSqwTMPPc-Q",
  authDomain: "wikijobs-46c6e.firebaseapp.com",
  projectId: "wikijobs-46c6e",
  storageBucket: "wikijobs-46c6e.firebasestorage.app",
  messagingSenderId: "554723768955",
  appId: "1:554723768955:web:dc20f0dc5e292e324c00de",
  measurementId: "G-LD7PRN13L1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);