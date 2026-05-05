// src/firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/app";
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBFK9YZqT-gPPSETWSVFu0ei3LFR3p9FEY",
  authDomain: "orpect-fdac8.firebaseapp.com",
  projectId: "orpect-fdac8",
  storageBucket: "orpect-fdac8.firebasestorage.app",
  messagingSenderId: "77472659310",
  appId: "1:77472659310:web:d1180bfb6b7f9b26cc337f",
  measurementId: "G-HD40KZ1CWE"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
