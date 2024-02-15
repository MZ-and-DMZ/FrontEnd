import { createSlice } from '@reduxjs/toolkit';

const groupSlice = createSlice({
  name: 'groupName',
  initialState: '',
  reducers: {
    INPUT_GROUP: (state, action) => action.payload,
  },
});

export const { INPUT_GROUP } = groupSlice.actions;

export default groupSlice.reducer;
