import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  cropImage: null,

};

const employeeSlice = createSlice({
  name: 'imageGallery',

  initialState,
  reducers: {
    setCropImage: (state, action) => {
      state.cropImage = action.payload;
    },
  },
});

export const { setCropImage} = employeeSlice.actions;

export default employeeSlice.reducer;