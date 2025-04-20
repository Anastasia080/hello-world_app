// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import authReducer from './authSlice';
import feedbackReducer from './feedbackSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        feedback: feedbackReducer,
        counter: counterReducer
  },
});

export default store;
