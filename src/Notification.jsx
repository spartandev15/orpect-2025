import React, { useEffect, useState } from 'react'
import { messaging, getToken, onMessage } from './firebase';
import { useStoreDeviceTokenMutation } from './apis/SuperAdmin/auth';
import { getFromLocalStorage } from './helper';
import { useDispatch } from 'react-redux';
import { addNotification, setNotifications } from './store/Notification';
import { toast } from 'react-toastify';
import { useGetNotificationsQuery } from './apis/SuperAdmin/notification';
const Notification = () => {
    const [storeDeviceToken] = useStoreDeviceTokenMutation();
      const [currentPage, setCurrentPage] = useState(1);
      const [searchText, setSearchText] = useState("");
      const {
        data,
        isLoading: loading,
        isError,
        refetch,
      } = useGetNotificationsQuery({
        page: currentPage,
        searchText,
      });

      useEffect(() => {
        if (data && data?.notificationlists) {
          dispatch(setNotifications({
            all: data?.notificationlists?.data,
            unread: data.notification_notread.filter(n => n.is_read === 0),
            count: data.notification_count,
          }));
        }
      }, [data,refetch]);
      console.log(data)
    const user = getFromLocalStorage("user");
    const dispatch = useDispatch();
    useEffect(() => {
        window.Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            navigator.serviceWorker.register('/orpect/firebase-messaging-sw.js')
              .then((registration) => {
                console.log('Service Worker registered:', registration);
      
                // Now get the token using the registration
                getToken(messaging, {
                  vapidKey: 'BIt8l068im-u_hFaUX-j5Syro87byjm5wSXsgKafy4_p2zukJNG9vsVtZCqeiewKCGYGFeDCsap43-XSF04QAew',
                  serviceWorkerRegistration: registration
                })
                  .then((currentToken) => {
                    if (currentToken) {
                      console.log('Token:', currentToken);
                     const data = {
                     token: currentToken,
                    user_id: user?.id,
                    };
               storeDeviceToken(data);
                    } else {
                      console.warn('No registration token available');
                    }
                  })
                  .catch((err) => console.error('An error occurred while retrieving token.', err));
              })
              .catch((err) => {
                console.error('Service Worker registration failed:', err);
              });
          }
        });
      
        // Foreground messages
        // onMessage(messaging, (payload) => {
        //   console.log('Message received. ', payload);
        //   alert(`Foreground notification: ${payload.notification.title}`);
        // });
        onMessage(messaging, (payload) => {
            console.log("📬 Foreground message received:", payload);
            const { title, body, image } = payload.notification;
            console.log("Message received: ", title, body);
            refetch()
            // dispatch(addNotification({
            //   message: `${title}: ${body}`,
            //   type: "info",
            // }));
            // Show toast notification
            toast(
              <div>
                <h4>{title}</h4>
                <p>{body}</p>
              </div>,
              {
                position: "top-right",
                autoClose: 5000, // Close after 5 seconds
                hideProgressBar: true,
                closeOnClick: false,
                draggable: true,
              }
            );
          });
      }, []);
  return null
}

export default Notification