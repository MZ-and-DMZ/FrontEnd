import { createSlice } from '@reduxjs/toolkit';

const departmentSlice = createSlice({
  name: 'department',
  initialState: '',
  reducers: {
    INPUT_DEPARTMENT: (state, action) => action.payload,
  },
});

export const { INPUT_DEPARTMENT } = departmentSlice.actions;

export default departmentSlice.reducer;
