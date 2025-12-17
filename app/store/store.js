"use client"
import { configureStore } from '@reduxjs/toolkit';
// import userReducer from '../features/userSlice'; 
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    user: authReducer, 
  },
});
