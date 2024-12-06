import { configureStore } from '@reduxjs/toolkit';
import publicDataReducer from './slices/publicDataSlice';
import adminReducer from './slices//adminSlice';
import authReducer from './slices//authSlice';

export const store = configureStore({
  reducer: {
    publicData: publicDataReducer, // Add your slice reducers here
    admin:adminReducer,
    auth: authReducer
  },
});