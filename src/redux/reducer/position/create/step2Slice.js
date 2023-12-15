import { createSlice } from '@reduxjs/toolkit';

const step2Slice = createSlice({
  name: 'step2',
  initialState: [],
  reducers: {
    UPDATE_STEP2: (state, action) =>
      // input을 입력하면 state를 변경하는 reducer
      action.payload,
  },
});

export const { UPDATE_STEP2 } = step2Slice.actions;

export default step2Slice.reducer;
