
import { BroadcastChannel } from 'broadcast-channel';
import { removeAllFromLocalStorage, getFromLocalStorage } from '../helper';
import { ADMIN_ROUTES, PUBLIC_ROUTES, getFullRoute } from '../config/routes.config';

const logoutChannel = new BroadcastChannel ('logout');

// Logout function that detects user type and redirects accordingly
export const logout = (isAdmin = false) => {
    logoutChannel.postMessage("Logout");
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
    logoutChannel.postMessage("Logout");
    removeAllFromLocalStorage();
    
    // Redirect based on detected user type (use getFullRoute to include base path)
    if (superAdminToken) {
        window.location.replace(getFullRoute(ADMIN_ROUTES.LOGIN));
    } else {
        window.location.replace(getFullRoute(PUBLIC_ROUTES.LOGIN));
    }
};

export const logoutAllTabs = () => {
    logoutChannel.onmessage = () => {
        const superAdminToken = getFromLocalStorage("superAdmintoken");
        removeAllFromLocalStorage();
        
        if (superAdminToken) {
            window.location.replace(getFullRoute(ADMIN_ROUTES.LOGIN));
        } else {
            window.location.replace(getFullRoute(PUBLIC_ROUTES.LOGIN));
        }
        
        logoutChannel.close();
    }
}