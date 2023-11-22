import { createSlice } from '@reduxjs/toolkit';

const attachedGroupSlice = createSlice({
  name: 'attachedGroup',
  initialState: [],
  reducers: {
    INPUT_ATTACHEDGROUP: (state, action) => action.payload,
  },
});

export const { INPUT_ATTACHEDGROUP } = attachedGroupSlice.actions;

export default attachedGroupSlice.reducer;
