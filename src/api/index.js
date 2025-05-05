import axios from 'axios';
import { getFromLocalStorage ,removeAllFromLocalStorage} from '../helper';
import { toast } from 'react-toastify';

let isToastShown = false;

// Create an instance of Axios
const instance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: "https://spartanbots.xyz/borpact/public/api",

  
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
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
    if (error.response.status === 401 && !isToastShown) {
      logout();
      toast.error(error?.response?.data.message);
      isToastShown = true; // Set the flag to true after showing the toast.
    }
    // Handle response error, if needed
    return Promise.reject(error);
  }
);

export const logout = () => {
  removeAllFromLocalStorage();
  window.location.replace('/orpect/login');
};

export default instance;
