import { createSlice } from '@reduxjs/toolkit';

const ipSlice = createSlice({
  name: 'ip',
  initialState: '',
  reducers: {
    INPUT_IP: (state, action) => action.payload,
  },
});

export const { INPUT_IP } = ipSlice.actions;

export default ipSlice.reducer;
