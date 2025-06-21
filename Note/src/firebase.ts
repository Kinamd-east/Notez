// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDH_zC6MPNXJ0yokdw5K096SMOY0R-CVWs",
  authDomain: "notez-a013e.firebaseapp.com",
  projectId: "notez-a013e",
  storageBucket: "notez-a013e.firebasestorage.app",
  messagingSenderId: "39346567617",
  appId: "1:39346567617:web:7a7142c08e1598225a9740",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
