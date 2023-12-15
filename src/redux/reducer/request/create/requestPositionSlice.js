import { createSlice } from '@reduxjs/toolkit';

// import { _notifications } from 'src/_mock';
import { _notificationList } from 'src/_mock/_notification';

const initialState = _notificationList;

const requestPositionSlice = createSlice({
  name: 'requestPosition',
  initialState,
  reducers: {
    REQUEST_POSITION: (state, action) =>
      // input을 입력하면 state를 변경하는 reducer
      [action.payload, ...state],
    READ_NOTIFICATION: (state, action) =>
      state.map((notification) => ({
        ...notification,
        isUnRead: false,
      })),
    INIT_NOTIFICATION: (state, action) => action.payload,
  },
});

export const { REQUEST_POSITION, READ_NOTIFICATION, INIT_NOTIFICATION } =
  requestPositionSlice.actions;

export default requestPositionSlice.reducer;
