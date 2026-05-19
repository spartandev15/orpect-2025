// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// const firebaseConfig = {
//   apiKey: "AIzaSyBFK9YZqT-gPPSETWSVFu0ei3LFR3p9FEY",
//   authDomain: "orpect-fdac8.firebaseapp.com",
//   projectId: "orpect-fdac8",
//   storageBucket: "orpect-fdac8.firebasestorage.app",
//   messagingSenderId: "77472659310",
//   appId: "1:77472659310:web:d1180bfb6b7f9b26cc337f",
//   measurementId: "G-HD40KZ1CWE"
// };
firebase.initializeApp({
    // apiKey: "AIzaSyD5f8pT306TCu31cnr5dFsTExfPtscwU1E",
    // authDomain: "orpect-50bca.firebaseapp.com",
    // projectId: "orpect-50bca",
    // storageBucket: "orpect-50bca.firebasestorage.app",
    // messagingSenderId: "868317724986",
    // appId: "1:868317724986:web:65d4eafd4c0313258f5003",
    // measurementId: "G-0M2NG13SCG"
      apiKey: "AIzaSyBFK9YZqT-gPPSETWSVFu0ei3LFR3p9FEY",
  authDomain: "orpect-fdac8.firebaseapp.com",
  projectId: "orpect-fdac8",
  storageBucket: "orpect-fdac8.firebasestorage.app",
  messagingSenderId: "77472659310",
  appId: "1:77472659310:web:d1180bfb6b7f9b26cc337f",
  measurementId: "G-HD40KZ1CWE"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const { title, body } = payload.notification;
  self.registration.showNotification(title, { body });
});
