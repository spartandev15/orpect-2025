import api from "./index";

const getEmployeeById = (id) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.get(`getEmployeeById/${id}`);
        resolve(res);
  
      } catch (error) {
        reject("errosds",error);
        if(error){
          
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
  const getEmployeeBySearch = (text,empType,page = 1) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.get(`searchEmployeeGlobally?searchText=${text}&emp=${empType}&page=${page}`);
        resolve(res);
  
      } catch (error) {
        reject(error?.response);
      }
    });
  };
  
  const getEmployee = (id) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.get(`getEmployee/${id}`);
        resolve(res);
  
      } catch (error) {
        reject(error?.response);
        if(error){
          
        }
      }
    });
  };

  const getEmployeesRecord = (id, page = 1) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.get(`getEmployeesRecord/${id}?page=${page}`);
        resolve(res);
      } catch (error) {
        reject(error?.response);
      }
    });
  };

  export {getEmployeeById,getExEmployee,getNonJoinerEmployee,getCurrentEmployee,deleteEmployeeById,getEmployeeBySearch,getEmployee,getEmployeesRecord}