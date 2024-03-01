// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzF91Z7W-OmCLvL-VFL7PMWzJPVpiWlQI",
  authDomain: "expense-tracker-cf569.firebaseapp.com",
  projectId: "expense-tracker-cf569",
  storageBucket: "expense-tracker-cf569.appspot.com",
  messagingSenderId: "341058815315",
  appId: "1:341058815315:web:54b0e756a949c07b8e8da6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy
