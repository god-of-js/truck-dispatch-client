import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

let firebaseConfig = {
  apiKey: 'AIzaSyCLyjacirS_zPH6VtVHMBLmcVJCrNPeR70',
  authDomain: 'truckdispatch-dev-a1507.firebaseapp.com',
  projectId: 'truckdispatch-dev-a1507',
  storageBucket: 'truckdispatch-dev-a1507.appspot.com',
  messagingSenderId: '719504794862',
  appId: '1:719504794862:web:22fd09976742bff55bbfff',
  measurementId: 'G-2Z959Q0MBY',
};
// @ts-ignore
if (process.env.NODE_ENV === 'production') {
  firebaseConfig = {
    apiKey: 'AIzaSyBfZ0JA-L7KEsGSjhRHeS5xpBg8BdEYTVo',
    authDomain: 'truckdispatch-bd60c.firebaseapp.com',
    projectId: 'truckdispatch-bd60c',
    storageBucket: 'truckdispatch-bd60c.appspot.com',
    messagingSenderId: '74982091969',
    appId: '1:74982091969:web:4953ce83c4de1731073840',
    measurementId: 'G-7QEDX9F755',
  };
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);

export default db;
