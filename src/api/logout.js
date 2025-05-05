
import { BroadcastChannel } from 'broadcast-channel';
import { removeAllFromLocalStorage } from '../helper';

const logoutChannel = new BroadcastChannel ('logout');
export const logout = () => {
    logoutChannel.postMessage("Logout")
    removeAllFromLocalStorage();
    window.location.replace('/orpect/login');
  };

export const logoutAllTabs = () => {
    logoutChannel.onmessage = () => {
        logout();
        logoutChannel.close();
       
        
    }
}