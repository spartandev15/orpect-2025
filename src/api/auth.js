import { setToLocalStorage } from "../helper";
import api from "./index";




const sendVerificationOtp = (data) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.post("sendVerificationOtp",{email:data});
        resolve(res);
      } catch (error) {
        reject(error?.response);
      }
    });
  };
const loginUser = (data) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.post("login", data);
      resolve(res);
    } catch (error) {
      reject(error?.response);
    }
  });
};
const registerUser = (data) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.post("register",data);
      setToLocalStorage("token", res.data.token);
      setToLocalStorage("user", res.data.user);
      resolve(res);
    } catch (error) {
      reject(error?.response);
    }
  });
};
const fogetPassword = (data) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.post("forgot-password", data);
      resolve(res);
    } catch (error) {
      reject(error?.response);
    }
  });
};
const isTokenValidate = (data) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.post("isTokenValid", {token:data});
      resolve(res?.data);
    } catch (error) {
      reject(error?.response);
    }
  });
};
const resetPasswordUser = (data) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.post("reset-password", data);
      resolve(res);
    } catch (error) {
            reject(error?.response);
    }
  });
};
const logoutUserapi = () => (dispatch) => {
  // const token = getFromLocalStorage("token") 
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.post("logout");
      resolve(res)
        } catch (error) {
            reject(error?.response);
    }
  });
};

const IsDomainValid = (value) => (dispatch) => {
  // const token = getFromLocalStorage("token") 
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.get(`checkDomain?domain=${value}`);
      resolve(res)
        } catch (error) {
            reject(error?.response);
    }
  });
};


export {sendVerificationOtp,loginUser,registerUser,fogetPassword,isTokenValidate,resetPasswordUser,logoutUserapi,IsDomainValid};


