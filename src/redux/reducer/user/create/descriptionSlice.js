import { createSlice } from '@reduxjs/toolkit';

const descriptionSlice = createSlice({
  name: 'description',
  initialState: '',
  reducers: {
    INPUT_DESCRIPTION: (state, action) => action.payload,
  },
});

export const { INPUT_DESCRIPTION } = descriptionSlice.actions;

export default descriptionSlice.reducer;
