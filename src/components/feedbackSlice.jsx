// feedbackSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFeedbacks = createAsyncThunk(
  'feedback/fetchFeedbacks',
  async () => {
    const response = await axios.get('http://localhost:3001/feedbacks');
    return response.data;
  }
);

export const addFeedback = createAsyncThunk(
  'feedback/addFeedback',
  async (feedbackData) => {
    const response = await axios.post('http://localhost:3001/feedbacks', feedbackData);
    return response.data;
  }
);

export const deleteFeedback = createAsyncThunk(
  'feedback/deleteFeedback',
  async (feedbackId) => {
    await axios.delete(`http://localhost:3001/feedbacks/${feedbackId}`);
    return feedbackId;
  }
);

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {
    resetFeedbackState: (state) => {
      state.items = [];
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export const { resetFeedbackState } = feedbackSlice.actions;
export default feedbackSlice.reducer;