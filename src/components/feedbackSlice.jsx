import { createSlice } from '@reduxjs/toolkit';

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: [],
  reducers: {
    addFeedback: (state, action) => {
      state.push(action.payload);
    }
  }
});

export const { addFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;