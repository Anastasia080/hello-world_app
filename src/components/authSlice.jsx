// authSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  currentUser: null,
  token: null,
  status: 'idle'
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.status = 'succeeded';
    },
    logout: (state) => {
      return { ... initialState}; // Полный сброс к начальному состоянию
    },
    updateProfile: (state, action) => {
      if (state.currentUser) {
        state.currentUser.profile = action.payload;
      }
    }
  }
});

export const { 
  login,
  logout, // Добавьте в экспорт
  updateProfile
} = authSlice.actions;

export default authSlice.reducer;