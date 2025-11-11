
import { BroadcastChannel } from 'broadcast-channel';
import { removeAllFromLocalStorage, getFromLocalStorage } from '../helper';
import { ADMIN_ROUTES, PUBLIC_ROUTES } from '../config/routes.config';

const logoutChannel = new BroadcastChannel ('logout');

// Logout function that detects user type and redirects accordingly
export const logout = (isAdmin = false) => {
    logoutChannel.postMessage("Logout");
    removeAllFromLocalStorage();
    
    // Redirect based on user type
    if (isAdmin) {
        window.location.replace(ADMIN_ROUTES.LOGIN);
    } else {
        window.location.replace(PUBLIC_ROUTES.LOGIN);
    }
};

// Logout function that auto-detects user type from localStorage
export const logoutAuto = () => {
    const superAdminToken = getFromLocalStorage("superAdmintoken");
    logoutChannel.postMessage("Logout");
    removeAllFromLocalStorage();
    
    // Redirect based on detected user type
    if (superAdminToken) {
        window.location.replace(ADMIN_ROUTES.LOGIN);
    } else {
        window.location.replace(PUBLIC_ROUTES.LOGIN);
    }
};

export const logoutAllTabs = () => {
    logoutChannel.onmessage = () => {
        const superAdminToken = getFromLocalStorage("superAdmintoken");
        removeAllFromLocalStorage();
        
        if (superAdminToken) {
            window.location.replace(ADMIN_ROUTES.LOGIN);
        } else {
            window.location.replace(PUBLIC_ROUTES.LOGIN);
        }
        
        logoutChannel.close();
    }
}