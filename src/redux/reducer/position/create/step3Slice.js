import { createSlice } from '@reduxjs/toolkit';

const step3Slice = createSlice({
  name: 'step3',
  initialState: [],
  reducers: {
    UPDATE_STEP3: (state, action) =>
      // input을 입력하면 state를 변경하는 reducer
      action.payload,
  },
});

export const { UPDATE_STEP3 } = step3Slice.actions;

export default step3Slice.reducer;
