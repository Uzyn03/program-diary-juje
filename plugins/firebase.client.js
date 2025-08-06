import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  // Ganti dengan konfigurasi Firebase Anda
  apiKey: "AIzaSyB28RTJRmXKLl6LQcj3oC5pbga09s81blI",
  authDomain: "program-juje.firebaseapp.com",
  projectId: "program-juje",
  storageBucket: "program-juje.firebasestorage.app",
  messagingSenderId: "279811055003",
  appId: "1:279811055003:web:a952533a71903fe2f1d53e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default defineNuxtPlugin(() => {
  return {
    provide: {
      firebase: app,
      db: db,
    },
  };
});
