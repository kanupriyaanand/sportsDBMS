import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "@firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo-tJ8rY77hG-xKRFU57GAr2_MdTXVW-k",
  authDomain: "sports-department-management.firebaseapp.com",
  databaseURL:
    "https://sports-department-management-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sports-department-management",
  storageBucket: "sports-department-management.appspot.com",
  messagingSenderId: "1062655734660",
  appId: "1:1062655734660:web:a940495b5eb6fa230e63d1",
  measurementId: "G-QPTYGDKFFB",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };
export default db;
