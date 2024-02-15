import { createSlice } from '@reduxjs/toolkit';

const endTimeSlice = createSlice({
  name: 'endTime',
  initialState: '',
  reducers: {
    INPUT_ENDTIME: (state, action) => action.payload,
  },
});

export const { INPUT_ENDTIME } = endTimeSlice.actions;

export default endTimeSlice.reducer;
