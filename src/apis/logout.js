
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
import { removeAllFromLocalStorage } from '../helper';

// Create a broadcast channel for logout communication
const logoutChannel = new BroadcastChannel('logout');

// Logout function: Posts a message to the broadcast channel, clears local storage, and redirects
export const logout = () => {
  logoutChannel.postMessage('Logout');
  removeAllFromLocalStorage();
  window.location.replace('/orpect/login');
};

// Listen for logout messages from other tabs and log out accordingly
export const logoutAllTabs = () => {
  logoutChannel.onmessage = () => {
    logout();
    logoutChannel.close(); // Close the channel after receiving the message
  };
};
