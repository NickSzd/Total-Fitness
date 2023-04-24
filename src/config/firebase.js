import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBnUdeuOgI138qZDqv3ZtZ6n0jzQe5uDok",
  authDomain: "total-fitness-c4eae.firebaseapp.com",
  projectId: "total-fitness-c4eae",
  storageBucket: "total-fitness-c4eae.appspot.com",
  messagingSenderId: "861678033534",
  appId: "1:861678033534:web:f99e0ef9b7dbf7d14e162f",
  measurementId: "G-V9HJVL60R3",
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
//Local emulator for testing
connectAuthEmulator(auth, "http://localhost:9899");
