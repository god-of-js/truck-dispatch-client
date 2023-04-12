// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Api from '.';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCJPLkHg56lgScrtj6HSS08BAkuvmSutgY',
  authDomain: 'truckdispatch-prod.firebaseapp.com',
  projectId: 'truckdispatch-prod',
  storageBucket: 'truckdispatch-prod.appspot.com',
  messagingSenderId: '1032360007058',
  appId: '1:1032360007058:web:c6bacf9e6ae3b2b1de5d4b',
  measurementId: 'G-PWFKVW0ZSK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// (async () => {
//   const querySnapshot = await getDocs(collection(db, 'user'));
//   Promise.all([
//     querySnapshot.forEach(async (doc) => {
//       const data = {
//         firstName: doc.data().firstName,
//         lastName: doc.data().lastName,
//         email: doc.data().email,
//         phone: doc.data().phone,
//         userType: doc.data().userType,
//         password: 'mmmmmmmmmmmm',
//       };
//       if (doc.data().userType === 'transporter') {
//         // @ts-ignore
//         data.status = doc.data().status;
//       }
//       console.log(data);
//       // @ts-ignore
//     //   Api.createUser(data)
//     }),
//   ]);
// })();
