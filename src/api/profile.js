import { removeFromLocalStorage, setToLocalStorage } from "../helper";
import api from "./index";

const updateProfile = (data) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.post(`updateProfile`, data);
      resolve(res);
          removeFromLocalStorage('user')
          setToLocalStorage('user',res?.data?.user)

    } catch (error) {
      reject(error?.response);
    }
  });
};
const updatePassword = (data) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.post(`updatePassword`, data);
      resolve(res);
    } catch (error) {
      reject(error?.response);
    }
  });
};
const getUser = () => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.get("getUser");
      resolve(res);
    } catch (error) {
      reject(error?.response);
    }
  });
};



export { updateProfile, updatePassword,getUser}; 
