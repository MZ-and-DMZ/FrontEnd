import { createSlice } from '@reduxjs/toolkit';

const step1Slice = createSlice({
  name: 'step1',
  initialState: {
    positionName: '',
    description: '',
    csp: '',
    policies: [],
  },
  reducers: {
    UPDATE_STEP1: (state, action) =>
      // input을 입력하면 state를 변경하는 reducer
      action.payload,
  },
});

export const { UPDATE_STEP1 } = step1Slice.actions;

export default step1Slice.reducer;
