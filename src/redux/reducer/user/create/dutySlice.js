import { createSlice } from '@reduxjs/toolkit';

const dutySlice = createSlice({
  name: 'duty',
  initialState: '',
  reducers: {
    INPUT_DUTY: (state, action) => action.payload,
  },
});

export const { INPUT_DUTY } = dutySlice.actions;

export default dutySlice.reducer;
