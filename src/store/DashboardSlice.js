import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  searchValue: '',
  empType:'',
  employeeCount:{
    currentEmployeeCount:0,
    exEmployeeCount:0,
    nonJoinerCount:0
  },
  profileImage:'',

};

const dashboardSlice = createSlice({
  name: 'imageGallery',

  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setEmpType: (state, action) => {
      state.empType = action.payload;
    },
    setCurrentEmployeeCount: (state, action) => {
      state.employeeCount.currentEmployeeCount = action.payload;
    },
    setExEmployeeCount: (state, action) => {
      state.employeeCount.exEmployeeCount = action.payload;
    },
    setNonJoinerCount: (state, action) => {
      state.employeeCount.nonJoinerCount = action.payload;
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },
});

export const { setSearchValue,setEmpType,setCurrentEmployeeCount,
  setExEmployeeCount,
  setNonJoinerCount,setProfileImage} = dashboardSlice.actions;

export default dashboardSlice.reducer;