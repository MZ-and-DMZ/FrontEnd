import { createSlice } from '@reduxjs/toolkit';

const anomalySelectedSlice = createSlice({
  name: 'anomalySelected',
  initialState: {},
  reducers: {
    SELECT_Anomaly: (state, action) =>
      // input을 입력하면 state를 변경하는 reducer
      action.payload,
  },
});

export const { SELECT_Anomaly } = anomalySelectedSlice.actions;

export default anomalySelectedSlice.reducer;
