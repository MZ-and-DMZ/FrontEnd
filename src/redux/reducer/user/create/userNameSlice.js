import { createSlice } from '@reduxjs/toolkit';

const userNameSlice = createSlice({
  name: 'userName',
  initialState: '',
  reducers: {
    INPUT_USERNAME: (state, action) => action.payload,
  },
});

export const { INPUT_USERNAME } = userNameSlice.actions;

export default userNameSlice.reducer;
