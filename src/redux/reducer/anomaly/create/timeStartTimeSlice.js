import { createSlice } from '@reduxjs/toolkit';

const startTimeSlice = createSlice({
  name: 'startTime',
  initialState: '',
  reducers: {
    INPUT_STARTTIME: (state, action) => action.payload,
  },
});

export const { INPUT_STARTTIME } = startTimeSlice.actions;

export default startTimeSlice.reducer;
