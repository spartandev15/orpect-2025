
import api from "./index";

const getDesignation = () => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.get("getDesignations");
        resolve(res?.data);  
      } catch (error) {
        reject(error?.response);
      }
    });
  };

  const contactUs = (data) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.post("sendSupportMail", data);
        resolve(res);
      } catch (error) {
        reject(error?.response);
      }
    });
  };
  export {getDesignation,contactUs}