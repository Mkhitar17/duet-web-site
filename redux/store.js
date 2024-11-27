import { configureStore } from '@reduxjs/toolkit';
import publicDataReducer from './slices/publicDataSlice';

export const store = configureStore({
  reducer: {
    publicData: publicDataReducer, // Add your slice reducers here
  },
});