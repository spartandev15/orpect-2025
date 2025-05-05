import api from "./index";

const getEmployeeById = (id) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.get(`getEmployeeById/${id}`);
        resolve(res);
  
      } catch (error) {
        reject("errosds",error);
        if(error){
          window.location.href="/404"
        }
      }
    });
  };
  const getExEmployee = (page,searchText,position) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.get(`/getExEmployees?page=${page}&searchText=${searchText}&position=${position}`);
        resolve(res);
  
      } catch (error) {
        reject(error?.response);
      }
    });
  };
  const getCurrentEmployee = (page,searchText,position) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.get(`getCurrentEmployees?page=${page}&searchText=${searchText}&position=${position}`);
        resolve(res);
  
      } catch (error) {
        reject(error?.response);
      }
    });
  };
  const getNonJoinerEmployee = () => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.get("getNonJoiners");
        resolve(res);
  
      } catch (error) {
        reject(error?.response);
      }
    });
  };
  const deleteEmployeeById = (id) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.delete(`deleteEmployee/${id}`);
        resolve(res);
  
      } catch (error) {
        reject(error?.response);
      }
    });
  };
  const getEmployeeBySearch = (text,empType) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.get(`searchEmployeeGlobally?searchText=${text}&emp=${empType}`);
        resolve(res);
  
      } catch (error) {
        reject(error?.response);
      }
    });
  };
  

  export {getEmployeeById,getExEmployee,getNonJoinerEmployee,getCurrentEmployee,deleteEmployeeById,getEmployeeBySearch}