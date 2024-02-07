import { createSlice } from '@reduxjs/toolkit';

export const activeSlice = createSlice({
  name: 'activeChat',
  initialState: {
    activeChat: localStorage.getItem("activeFriend")
      ? JSON.parse(localStorage.getItem("activeFriend"))
      : null,
  },
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
  },
});

export const { setActiveChat } = activeSlice.actions;

export default activeSlice.reducer;