import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import listingsReducer from '../features/listingsSlice';
import profileReducer from '../features/profileSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingsReducer,
    profile:profileReducer,
  },
});
