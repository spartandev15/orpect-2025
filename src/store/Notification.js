// redux/slices/notificationSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  list: [], // used for frontend messages/toasts
  all: [], // API-fetched notifications
  unread: [],
  count: 0,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: {
      reducer: (state, action) => {
        state.list.push(action.payload);
      },
      prepare: ({ message, type = 'info', duration = 3000 }) => ({
        payload: {
          id: nanoid(),
          message,
          type,
          duration,
          timestamp: new Date().toISOString(),
        },
      }),
    },
    setNotifications: (state, action) => {
      state.all = action.payload.all;
      state.unread = action.payload.unread;
      state.count = action.payload.count;
    },
    removeNotification: (state, action) => {
      state.list = state.list.filter(notif => notif.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.list = [];
    },
  },
});

export const {
  addNotification,
  setNotifications,
  removeNotification,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
