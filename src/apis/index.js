// import axios from 'axios';
// import { getFromLocalStorage ,removeAllFromLocalStorage} from '../helper';
// import { toast } from 'react-toastify';

// let isToastShown = false;

// // Create an instance of Axios
// const instance = axios.create({
//   // baseURL: process.env.REACT_APP_BASE_URL,
//   baseURL: "https://spartanbots.xyz/borpact/api",

  
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
// });

// // Add request interceptor
// instance.interceptors.request.use(
//   (config) => {
//     const token = getFromLocalStorage('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Handle request error, if needed
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor
// instance.interceptors.response.use(
//   (response) => {
//     // Add custom logic for successful response, if needed
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401 && !isToastShown) {
//       logout();
//       toast.error(error?.response?.data.message);
//       isToastShown = true; // Set the flag to true after showing the toast.
//     }
//     // Handle response error, if needed
//     return Promise.reject(error);
//   }
// );

// export const logout = () => {
//   removeAllFromLocalStorage();
//   window.location.replace('/');
// };

// export default instance;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getFromLocalStorage } from "../helper";
import { toast } from "react-toastify";
import { BASE_URL } from "../config/api.config";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = getFromLocalStorage("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const customBaseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle API error format: {status:"error",message:""}
  if (result.data && result.data.status === "error") {
    // Transform success response with error status to error format
    result = {
      error: {
        status: "CUSTOM_ERROR",
        data: {
          status: "error",
          message: result.data.message || "An error occurred"
        }
      }
    };
  }

  if (result.error) {
    // Handle HTTP errors (401, 404, 500, etc.)
    if (result.error.status === 401) {
      toast.error(result.error.data?.message || "Unauthorized");
      // removeAllFromLocalStorage();
      // window.location.replace('/orpect');
    } else if (result.error.data?.status === "error") {
      // Handle custom error format from API
      toast.error(result.error.data?.message || "Something went wrong");
    } else if (result.error.data?.message) {
      // Handle other error messages
      toast.error(result.error.data.message || "Something went wrong");
    }
  }

  return result;
};


export const api = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  endpoints: () => ({}), // leave empty, inject later
});
