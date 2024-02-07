import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import activeSlice from './ActiveSlice';

export default configureStore({
  reducer: {
    userLoginInfo: userSlice,
    activeChat: activeSlice,
  },
});