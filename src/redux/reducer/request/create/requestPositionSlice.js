import { createSlice } from '@reduxjs/toolkit';

import { _notifications } from 'src/_mock';

const initialState = _notifications;

const requestPositionSlice = createSlice({
  name: 'requestPosition',
  initialState,
  reducers: {
    REQUEST_POSITION: (state, action) =>
      // input을 입력하면 state를 변경하는 reducer
      [...state, action.payload],
  },
});

export const { REQUEST_POSITION } = requestPositionSlice.actions;

export default requestPositionSlice.reducer;
