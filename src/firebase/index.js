import { initializeApp } from "firebase/app"

// Add the Firebase products that you want to use
import { getAuth} from "firebase/auth";
import { getDatabase} from"firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBq5w_q8bGzQUo_xPxxXOahdSpyAcDyRaw",
    authDomain: "hearvision-9eefb.firebaseapp.com",
    databaseURL: "https://hearvision-9eefb-default-rtdb.firebaseio.com",
    projectId: "hearvision-9eefb",
    storageBucket: "hearvision-9eefb.appspot.com",
    messagingSenderId: "244856285423",
    appId: "1:244856285423:web:c23d045f332638c1ec531a",
    measurementId: "G-8MYZVZCF58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);