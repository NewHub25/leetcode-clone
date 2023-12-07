import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDbFO8AqU-mQKy04GVZp7W1lVas9GXtbio",
  authDomain: "leetclone-peru.firebaseapp.com",
  projectId: "leetclone-peru",
  storageBucket: "leetclone-peru.appspot.com",
  messagingSenderId: "840203870076",
  appId: "1:840203870076:web:a08d2156aa47f655ad0ef9"
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, app };