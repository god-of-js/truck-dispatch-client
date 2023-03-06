import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

let firebaseConfig;
// @ts-ignore
if (process.env.NODE_ENV === 'production') {
  firebaseConfig = {
    apiKey: 'AIzaSyBDYP3XZP0NL7pFp22E0nnx6XvCk5KrE_w',
    authDomain: 'truckdispatch-2d5cd.firebaseapp.com',
    projectId: 'truckdispatch-2d5cd',
    storageBucket: 'truckdispatch-2d5cd.appspot.com',
    messagingSenderId: '173303205952',
    appId: '1:173303205952:web:f323a1fcb4f18181fdcfa5',
    measurementId: 'G-4NZP8H8YR6',
  };
} else {
  firebaseConfig = {
    apiKey: "AIzaSyA5Ik4kRyuWqa_Q_hY6Z9z9q1zDRPaMxPA",
    authDomain: "truckdispatch-local.firebaseapp.com",
    projectId: "truckdispatch-local",
    storageBucket: "truckdispatch-local.appspot.com",
    messagingSenderId: "900817402837",
    appId: "1:900817402837:web:a72c09b300657eb08d1b5c",
    measurementId: "G-5QRFN2CMGH"
  };
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);

export default db;
