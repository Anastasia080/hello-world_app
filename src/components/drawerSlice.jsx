import { createSlice } from '@reduxjs/toolkit';

const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {
    open: false,
  },
  reducers: {
    toggleDrawer: (state) => {
      state.open = !state.open;
    },
  },
});

export const { toggleDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;