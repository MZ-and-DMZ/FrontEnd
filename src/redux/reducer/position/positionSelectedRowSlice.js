import { createSlice } from '@reduxjs/toolkit';

const positionSelectedRowSlice = createSlice({
  name: 'positionSelectedRow',
  initialState: {},
  reducers: {
    SELECT_ROW: (state, action) =>
      // input을 입력하면 state를 변경하는 reducer
      action.payload,
  },
});

export const { SELECT_ROW } = positionSelectedRowSlice.actions;

export default positionSelectedRowSlice.reducer;
