import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import feedbackReducer from './feedbackSlice';
import counterReducer from './counterSlice'; 
import drawerReducer from './drawerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    feedback: feedbackReducer,
    counter: counterReducer,
    drawer: drawerReducer,
  }
});