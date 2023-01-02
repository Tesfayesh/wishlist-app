import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import wishReducer from '../features/wish/wishSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wish: wishReducer    
  },
})
