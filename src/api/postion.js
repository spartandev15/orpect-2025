import api from "./index";
const getPosition = () => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.get("getPositions");
        resolve(res);
  
      } catch (error) {
        reject(error);
      }
    });
  };

  const addPostion = (data) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.post("addPositions",data);
        resolve(res?.data);
  
      } catch (error) {
        reject(error);
      }
    });
  };
  const deletePositionById = (id) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.delete(`removePosition/${id}`);
        resolve(res?.data);
  
      } catch (error) {
        reject(error);
      }
    });
  };

  const updatePositionById = (id ,data) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.post(`updatePosition/${id}`,data);
        resolve(res?.data);
  
      } catch (error) {
        reject(error?.data);
      }
    });
  };
  const checkPositionDelete = (data) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.get(`getPositionAlreadyInUse/${data}`);
        resolve(res?.data);
  
      } catch (error) {
        reject(error?.data);
      }
    });
  };

  
  
  export {getPosition,addPostion,deletePositionById,updatePositionById,checkPositionDelete}