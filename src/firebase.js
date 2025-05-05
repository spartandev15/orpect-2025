// src/firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/app";
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyD5f8pT306TCu31cnr5dFsTExfPtscwU1E",
    authDomain: "orpect-50bca.firebaseapp.com",
    projectId: "orpect-50bca",
    storageBucket: "orpect-50bca.firebasestorage.app",
    messagingSenderId: "868317724986",
    appId: "1:868317724986:web:65d4eafd4c0313258f5003",
    measurementId: "G-0M2NG13SCG"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
