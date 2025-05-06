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
import { getFromLocalStorage, removeAllFromLocalStorage } from "../helper";
import { toast } from "react-toastify";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://spartanbots.xyz/borpact/public/api",
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

  if (result.error) {
    if (result.error.status === 401) {
      toast.error(result.error.data?.message || "Unauthorized");
      // removeAllFromLocalStorage();
      // window.location.replace('/orpect');
    } else if (result.error.data?.message) {
      // Optional global toast for non-401 errors
      toast.error(result?.error?.data?.message || "Something Went Wrong");
    }
  }

  return result;
};


export const api = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  endpoints: () => ({}), // leave empty, inject later
});
