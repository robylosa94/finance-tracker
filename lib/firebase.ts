// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "finance-tracker-c0597.firebaseapp.com",
  projectId: "finance-tracker-c0597",
  storageBucket: "finance-tracker-c0597.appspot.com",
  messagingSenderId: "957407387416",
  appId: "1:957407387416:web:f2f0d7c5174ff554d5086d",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

export { app, db }
