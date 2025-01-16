// Import required Firebase modules
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBxMf3oKo6-D-XfO7I5ztnRY951WtCL2k",
  authDomain: "agrisense-24467.firebaseapp.com",
  databaseURL:
    "https://agrisense-24467-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "agrisense-24467",
  storageBucket: "agrisense-24467.appspot.com",
  messagingSenderId: "929031932923",
  appId: "1:929031932923:web:97ff76d4259e73209a195e",
};

// Check if Firebase App is already initialized
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize the Firebase Realtime Database
const database = getDatabase(app);

// Export necessary utilities for database interactions
export { app, database, ref, set };
