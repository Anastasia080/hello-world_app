import { createSlice } from '@reduxjs/toolkit';

// Функция для безопасного получения данных из localStorage
const getSafeLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item && item !== 'undefined' ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
};

const initialState = {
  isLoggedIn: getSafeLocalStorage('isLoggedIn') || false,
  user: getSafeLocalStorage('user') || null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      try {
        const userData = action.payload || {};
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(userData));
        state.isLoggedIn = true;
        state.user = userData;
      } catch (error) {
        console.error('Error saving auth data:', error);
      }
    },
    logout: (state) => {
      try {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
      } catch (error) {
        console.error('Error clearing auth data:', error);
      }
      state.isLoggedIn = false;
      state.user = null;
    },
    checkAuth: (state) => {
      try {
        state.isLoggedIn = getSafeLocalStorage('isLoggedIn') || false;
        state.user = getSafeLocalStorage('user');
      } catch (error) {
        console.error('Error checking auth:', error);
      }
    }
  }
});

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;