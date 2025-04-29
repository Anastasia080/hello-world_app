import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk(
  'auth/fetchUsers',
  async () => {
    const response = await axios.get('http://localhost:3001/users');
    return response.data;
  }
);

export const blockUser = createAsyncThunk(
  'auth/blockUser',
  async (userId, { getState }) => {
    const state = getState();
    const user = state.auth.users.find(u => u.id === userId);
    const response = await axios.patch(`http://localhost:3001/users/${userId}`, {
      isBlocked: !user.isBlocked
    });
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (userId) => {
    await axios.delete(`http://localhost:3001/users/${userId}`);
    return userId;
  }
);

const initialState = {
  isLoggedIn: false,
  currentUser: null,
  token: null,
  status: 'idle',
  role: null,
  users: [],
  usersStatus: 'idle',
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
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.usersStatus = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.usersStatus = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.usersStatus = 'failed';
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        const userIndex = state.users.findIndex(u => u.id === action.payload.id);
        if (userIndex !== -1) {
          state.users[userIndex].isBlocked = action.payload.isBlocked;
          if (state.currentUser?.id === action.payload.id && action.payload.isBlocked) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return { ...initialState };
          }
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  }
});

export const { 
  login,
  logout,
  updateProfile,
  setUsers
} = authSlice.actions;

export default authSlice.reducer;