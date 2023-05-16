// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
// TODO : Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnxu-yDg1Vmg3jJmh5a_iW1bBgUq6uO4k",
  authDomain: "tiki-clone-l.firebaseapp.com",
  projectId: "tiki-clone-l",
  storageBucket: "tiki-clone-l.appspot.com",
  messagingSenderId: "57990809359",
  appId: "1:57990809359:web:94f5273ed71e3da9b7607a",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
