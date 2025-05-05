// import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// import DashboardSlice from "./DashboardSlice";
// import FormSlice from "./FormSlice";
// import employeeSlice from "./employeeSlice";
// import toggleSlice from "./toggleSlice";
// import dataReducer, { fetchPosition } from './positionSlice'

// const isLoggedIn = !!localStorage.getItem("token");


// const store =  configureStore({
//   reducer: {
//    dashboardData:DashboardSlice,
//    form: FormSlice,
//    employeeData:employeeSlice,
//    toggle:toggleSlice,
//    data:dataReducer,
//    middleware:[thunk]
//   },
// });
// if(isLoggedIn){
//   store.dispatch(fetchPosition());
// }

// export default store








import { configureStore } from "@reduxjs/toolkit";
// import { api } from "../api/index"; // base API
import toggleSlice from "./toggleSlice";
import DashboardSlice from "./DashboardSlice";
import FormSlice from "./FormSlice";
import employeeSlice from "./employeeSlice";
import notificationSlice from "./Notification";

import dataReducer, { fetchPosition } from './positionSlice'

import { api } from "../apis/index";
const isLoggedIn = !!localStorage.getItem("token");

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    toggle: toggleSlice,
       dashboardData:DashboardSlice,
          form: FormSlice,
   employeeData:employeeSlice,
   notification:notificationSlice,
   data:dataReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
if(isLoggedIn){
  store.dispatch(fetchPosition());
}

export default store;






