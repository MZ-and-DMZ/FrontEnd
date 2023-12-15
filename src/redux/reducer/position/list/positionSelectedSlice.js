import { createSlice } from '@reduxjs/toolkit';

const positionSelectedSlice = createSlice({
  name: 'positionSelected',
  initialState: {},
  reducers: {
    SELECT_POSITION: (state, action) =>
      // input을 입력하면 state를 변경하는 reducer
      action.payload,
  },
});

export const { SELECT_POSITION } = positionSelectedSlice.actions;

export default positionSelectedSlice.reducer;
