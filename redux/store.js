import { configureStore } from '@reduxjs/toolkit';
import publicDataReducer from './slices/publicDataSlice';
import adminReducer from './slices/adminSlice';
import authReducer from './slices/authSlice';
import languageReducer from "./slices/languageSlice";

export const store = configureStore({
  reducer: {
    publicData: publicDataReducer, 
    admin:adminReducer,
    auth: authReducer,
    language: languageReducer
  },
});