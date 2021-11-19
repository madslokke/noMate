import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAKoMXH4gteMcOyFRfKHl_YJVt3Zys01CY",
  authDomain: "nomate-7d40f.firebaseapp.com",
  projectId: "nomate-7d40f",
  storageBucket: "nomate-7d40f.appspot.com",
  messagingSenderId: "1086668308454",
  appId: "1:1086668308454:web:0deb8848d227d845a5e027"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
