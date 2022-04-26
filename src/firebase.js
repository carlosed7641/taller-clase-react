// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDlVuHSGLx3gw8UlI7Rv8AQSqzFp5lGxks",
    authDomain: "taller-clase-react.firebaseapp.com",
    projectId: "taller-clase-react",
    storageBucket: "taller-clase-react.appspot.com",
    messagingSenderId: "441596137395",
    appId: "1:441596137395:web:23bddee15cd2b623d785c6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}