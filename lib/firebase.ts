import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// const firebaseConfig = {
//   apiKey: 'AIzaSyCvxvhrXq_xqJtFuBZPCWvS-WcR6x_y3Zo',
//   authDomain: 'ideas-alcaen.firebaseapp.com',
//   projectId: 'ideas-alcaen',
//   storageBucket: 'ideas-alcaen.appspot.com',
//   messagingSenderId: '78978469071',
//   appId: '1:78978469071:web:cd19b7fd4c1d618eb0fbba',
//   measurementId: 'G-ZZ3CC641T6',
// };
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth: any = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const emailAuthProvider = new firebase.auth.EmailAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
