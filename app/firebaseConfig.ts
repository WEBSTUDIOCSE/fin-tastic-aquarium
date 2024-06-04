// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi19U9Cz8wPZws7C1hiGtHC5Om2enjcgI",
  authDomain: "fin-tastic-aquarium.firebaseapp.com",
  projectId: "fin-tastic-aquarium",
  storageBucket: "fin-tastic-aquarium.appspot.com",
  messagingSenderId: "597560661882",
  appId: "1:597560661882:web:e48c8377a25ca7e85a68c3",
  measurementId: "G-FSBPN2THHB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
