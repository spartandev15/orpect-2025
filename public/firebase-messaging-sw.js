// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyD5f8pT306TCu31cnr5dFsTExfPtscwU1E",
    authDomain: "orpect-50bca.firebaseapp.com",
    projectId: "orpect-50bca",
    storageBucket: "orpect-50bca.firebasestorage.app",
    messagingSenderId: "868317724986",
    appId: "1:868317724986:web:65d4eafd4c0313258f5003",
    measurementId: "G-0M2NG13SCG"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const { title, body } = payload.notification;
  self.registration.showNotification(title, { body });
});
