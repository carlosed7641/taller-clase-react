// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZ3ibNxHRiffxxFRXGWd3w77cTPPhfm6Q",
    authDomain: "taller-clase-react-fireb-977b5.firebaseapp.com",
    projectId: "taller-clase-react-fireb-977b5",
    storageBucket: "taller-clase-react-fireb-977b5.appspot.com",
    messagingSenderId: "312106580808",
    appId: "1:312106580808:web:501c38b4c69ba2bcfc517d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}