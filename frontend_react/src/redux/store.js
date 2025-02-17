import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import loaderReducer from './loaderSlice';
import dailyLogReducer from './dailyLogSlice';
import diaryReducer from './diarySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
    dailyLog: dailyLogReducer,
    diary: diaryReducer,
  },
});
