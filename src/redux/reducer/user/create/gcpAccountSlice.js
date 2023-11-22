import { createSlice } from '@reduxjs/toolkit';

const gcpAccountSlice = createSlice({
  name: 'gcpAccount',
  initialState: '',
  reducers: {
    INPUT_GCPACCOUNT: (state, action) => action.payload,
  },
});

export const { INPUT_GCPACCOUNT } = gcpAccountSlice.actions;

export default gcpAccountSlice.reducer;
