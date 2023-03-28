import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  getFirestore,
} from "firebase/firestore";
import "@firebase/firestore";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

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
//const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export { auth , signInWithGoogle };
export default db;

