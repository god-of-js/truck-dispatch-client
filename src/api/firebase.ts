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
if (process.env.NODE_ENV === 'production') {
  firebaseConfig = {
    apiKey: "AIzaSyBfZ0JA-L7KEsGSjhRHeS5xpBg8BdEYTVo",
    authDomain: "truckdispatch-bd60c.firebaseapp.com",
    projectId: "truckdispatch-bd60c",
    storageBucket: "truckdispatch-bd60c.appspot.com",
    messagingSenderId: "74982091969",
    appId: "1:74982091969:web:4953ce83c4de1731073840",
    measurementId: "G-7QEDX9F755"
  };
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);

export default db;
