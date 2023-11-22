import { createSlice } from '@reduxjs/toolkit';

const cspSlice = createSlice({
  name: 'csp',
  initialState: '',
  reducers: {
    INPUT_CSP: (state, action) => action.payload,
  },
});

export const { INPUT_CSP } = cspSlice.actions;

export default cspSlice.reducer;
