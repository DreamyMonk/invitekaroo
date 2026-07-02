// Modular Firebase client — production backend for the host dashboard.
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiNPye-Epm46F1diUxL8nftiL_QSKVe6U",
  authDomain: "invitekaroo-823b3.firebaseapp.com",
  projectId: "invitekaroo-823b3",
  storageBucket: "invitekaroo-823b3.firebasestorage.app",
  messagingSenderId: "934224948749",
  appId: "1:934224948749:web:897b42548e44fcd70c6f44",
  measurementId: "G-9B21GCLN5D",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
