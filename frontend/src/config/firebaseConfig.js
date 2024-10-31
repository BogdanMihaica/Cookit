// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4LrATKeRqms79WW2MHMDRfenioJQQG7o",
  authDomain: "images-cookit.firebaseapp.com",
  projectId: "images-cookit",
  storageBucket: "images-cookit.appspot.com",
  messagingSenderId: "3006271447",
  appId: "1:3006271447:web:2f7cfefeaef40dea4e4592",
  measurementId: "G-7Z89F8YD47",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };
