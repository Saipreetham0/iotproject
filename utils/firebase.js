import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// import { Database } from "firebase/database";
import { getDatabase, ref, onValue, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCiIG-sTPSX06NeqO1oKY45g6z1xxT56Lw",
  authDomain: "ksp-iot.firebaseapp.com",
  databaseURL:
    "https://ksp-iot-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ksp-iot",
  storageBucket: "ksp-iot.appspot.com",
  messagingSenderId: "828466234416",
  appId: "1:828466234416:web:569e1f8bcfa7e939e199f5",
  measurementId: "G-V4ZWPPVRBE",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

export const auth = getAuth(app);

const database = getDatabase(app);

// export

export const storage = getStorage(app);

export default app;
