import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

let firebaseConfig = {
  apiKey: 'AIzaSyCseX2pxV3j0FUYBCt1ifNto5Fdj0fpuW4',
  authDomain: 'td-dev-c20a2.firebaseapp.com',
  projectId: 'td-dev-c20a2',
  storageBucket: 'td-dev-c20a2.appspot.com',
  messagingSenderId: '926041702630',
  appId: '1:926041702630:web:4ca168cb3f90d7f0527b27',
  measurementId: 'G-M2LDKSM2BT',
};
// @ts-ignore
// if (process.env.NODE_ENV === 'production') {
//   firebaseConfig = {
//     apiKey: 'AIzaSyBDYP3XZP0NL7pFp22E0nnx6XvCk5KrE_w',
//     authDomain: 'truckdispatch-2d5cd.firebaseapp.com',
//     projectId: 'truckdispatch-2d5cd',
//     storageBucket: 'truckdispatch-2d5cd.appspot.com',
//     messagingSenderId: '173303205952',
//     appId: '1:173303205952:web:f323a1fcb4f18181fdcfa5',
//     measurementId: 'G-4NZP8H8YR6',
//   };
// } else {
//   firebaseConfig = {
//     apiKey: "AIzaSyCseX2pxV3j0FUYBCt1ifNto5Fdj0fpuW4",
//     authDomain: "td-dev-c20a2.firebaseapp.com",
//     projectId: "td-dev-c20a2",
//     storageBucket: "td-dev-c20a2.appspot.com",
//     messagingSenderId: "926041702630",
//     appId: "1:926041702630:web:4ca168cb3f90d7f0527b27",
//     measurementId: "G-M2LDKSM2BT"
//   };
// }

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);

export default db;
