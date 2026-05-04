
// import { BroadcastChannel } from 'broadcast-channel';
// import { removeAllFromLocalStorage } from '../helper';

// const logoutChannel = new BroadcastChannel ('logout');

// export const logout = () => {
//     logoutChannel.postMessage("Logout")
//     removeAllFromLocalStorage();
//     window.location.replace('/login');
//   };

// export const logoutAllTabs = () => {
//     logoutChannel.onmessage = () => {
//         logout();
//         logoutChannel.close();
       
        
//     }
// }import { BroadcastChannel } from 'broadcast-channel';
import { removeAllFromLocalStorage, getFromLocalStorage } from '../helper';
import { ADMIN_ROUTES, PUBLIC_ROUTES, getFullRoute } from '../config/routes.config';

// Create a broadcast channel for logout communication
const logoutChannel = new BroadcastChannel('logout');

// Logout function: Posts a message to the broadcast channel, clears local storage, and redirects
export const logout = (isAdmin = false) => {
  logoutChannel.postMessage('Logout');
  removeAllFromLocalStorage();
  
  // Redirect based on user type (use getFullRoute to include base path)
  if (isAdmin) {
    window.location.replace(getFullRoute(ADMIN_ROUTES.LOGIN));
  } else {
    window.location.replace(getFullRoute(PUBLIC_ROUTES.LOGIN));
  }
};

// Logout function that auto-detects user type from localStorage
export const logoutAuto = () => {
  const superAdminToken = getFromLocalStorage("superAdmintoken");
  logoutChannel.postMessage('Logout');
  removeAllFromLocalStorage();
  
  // Redirect based on detected user type (use getFullRoute to include base path)
  if (superAdminToken) {
    window.location.replace(getFullRoute(ADMIN_ROUTES.LOGIN));
  } else {
    window.location.replace(getFullRoute(PUBLIC_ROUTES.LOGIN));
  }
};

// Listen for logout messages from other tabs and log out accordingly
export const logoutAllTabs = () => {
  logoutChannel.onmessage = () => {
    const superAdminToken = getFromLocalStorage("superAdmintoken");
    removeAllFromLocalStorage();
    
    if (superAdminToken) {
      window.location.replace(getFullRoute(ADMIN_ROUTES.LOGIN));
    } else {
      window.location.replace(getFullRoute(PUBLIC_ROUTES.LOGIN));
    }
    
    logoutChannel.close(); // Close the channel after receiving the message
  };
};
