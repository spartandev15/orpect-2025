import axios from 'axios';
import { getFromLocalStorage ,removeAllFromLocalStorage} from '../helper';
import { toast } from 'react-toastify';
import { API_CONFIG } from '../config/api.config';
import { ADMIN_ROUTES, PUBLIC_ROUTES, getFullRoute } from '../config/routes.config';

let isToastShown = false;

// Create an instance of Axios
const instance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
});

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = getFromLocalStorage('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error, if needed
    return Promise.reject(error);
  }
);

// Add response interceptor
instance.interceptors.response.use(
  (response) => {
    // Add custom logic for successful response, if needed
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401 && !isToastShown) {
      // Auto-detect user type for logout
      const superAdminToken = getFromLocalStorage("superAdmintoken");
      removeAllFromLocalStorage();
      
      if (superAdminToken) {
        window.location.replace(getFullRoute(ADMIN_ROUTES.LOGIN));
      } else {
        window.location.replace(getFullRoute(PUBLIC_ROUTES.LOGIN));
      }
      
      toast.error(error?.response?.data?.message || "Session expired. Please login again.");
      isToastShown = true; // Set the flag to true after showing the toast.
    }
    // Handle response error, if needed
    return Promise.reject(error);
  }
);

export const logout = (isAdmin = false) => {
  removeAllFromLocalStorage();
  
  // Redirect based on user type (use getFullRoute to include base path)
  if (isAdmin) {
    window.location.replace(getFullRoute(ADMIN_ROUTES.LOGIN));
  } else {
    window.location.replace(getFullRoute(PUBLIC_ROUTES.LOGIN));
  }
};

export default instance;
