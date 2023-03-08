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
    apiKey: "AIzaSyCVVLR9SIZDJ0ttFZU3Iv72Y8HAEUXd7JI",
    authDomain: "truckdispatch-dev-4b677.firebaseapp.com",
    projectId: "truckdispatch-dev-4b677",
    storageBucket: "truckdispatch-dev-4b677.appspot.com",
    messagingSenderId: "353823064883",
    appId: "1:353823064883:web:fdd5556bcd58a40e007446",
    measurementId: "G-BBSVPNG4EQ"
  };
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);

export default db;
