// firebase/db.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDeehiv06M5VrF-1riEX5ivSZ5tfQEwxPU",
  authDomain: "vpndseducation-5b5bd.firebaseapp.com",
  projectId: "vpndseducation-5b5bd",
  storageBucket: "vpndseducation-5b5bd.firebasestorage.app",
  messagingSenderId: "736364040115",
  appId: "1:736364040115:web:cb6ff5e598b71b559145c6",
  measurementId: "G-DRTEM8R3V9"
};

// ✅ Initialize app and Firestore once
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
