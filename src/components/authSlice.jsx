import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  currentUser: null,
  token: null,
  status: 'idle',
  role: null,
  isBlocked: false
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
      state.role = action.payload.role;
      state.isBlocked = action.payload.isBlocked || false;
    },
    logout: (state) => {
      return { ...initialState };
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
  logout,
  updateProfile
} = authSlice.actions;

export default authSlice.reducer;