import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: false,
  reducers: {
    toggle: (state, action) => action.payload,
  },
});

export const { toggle } = toggleSlice.actions;
export default toggleSlice.reducer;
