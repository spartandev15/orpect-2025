import Navigation from './navigation/index';
import { BrowserRouter as Router} from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { logoutAllTabs } from './api/logout';
import CookieConsent from './component/Cookies';
import { messaging, getToken, onMessage } from './firebase';
import Notification from './Notification';



function App() {
  // useEffect(() => {
  //   Notification.requestPermission().then((permission) => {
  //     if (permission === 'granted') {
  //       navigator.serviceWorker.register('/orpect/firebase-messaging-sw.js')
  //         .then((registration) => {
  //           console.log('Service Worker registered:', registration);
  
  //           // Now get the token using the registration
  //           getToken(messaging, {
  //             vapidKey: 'BIt8l068im-u_hFaUX-j5Syro87byjm5wSXsgKafy4_p2zukJNG9vsVtZCqeiewKCGYGFeDCsap43-XSF04QAew',
  //             serviceWorkerRegistration: registration
  //           })
  //             .then((currentToken) => {
  //               if (currentToken) {
  //                 console.log('Token:', currentToken);
  //               } else {
  //                 console.warn('No registration token available');
  //               }
  //             })
  //             .catch((err) => console.error('An error occurred while retrieving token.', err));
  //         })
  //         .catch((err) => {
  //           console.error('Service Worker registration failed:', err);
  //         });
  //     }
  //   });
  
  //   // Foreground messages
  //   onMessage(messaging, (payload) => {
  //     console.log('Message received. ', payload);
  //     alert(`Foreground notification: ${payload.notification.title}`);
  //   });
  // }, []);
  
  
  useEffect(() => {
    logoutAllTabs()
   }, [])
   
  return (
    <>
    <ToastContainer/>
        <CookieConsent/>
        <Notification />
    <Router basename="/orpect">
      <Navigation/>
    </Router>
    </>
    
  );
}

export default App;
