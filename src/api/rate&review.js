import api from "./index";

const addRateReview = (id,data) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.post(`rateAndReview/${id}`, data);
        resolve(res);
      } catch (error) {
        reject(error?.response?.data);
      }
    });
  };
  const viewGlobalSearchedEmpById = (id) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.get(`viewGlobalSearchedEmp/${id}`);
        resolve(res);
  
      } catch (error) {
        reject(error?.response);
        if(error){
          window.location.href="/404"
        }
      }
    });
  };

  export {addRateReview,viewGlobalSearchedEmpById};

  // const AddReview = (data) => (dispatch) => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const res = await api.post("addReview", data);
  //       resolve(res);
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // };

  // export {AddReview};