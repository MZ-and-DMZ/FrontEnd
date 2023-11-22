import { createSlice } from '@reduxjs/toolkit';

const awsAccountSlice = createSlice({
  name: 'awsAccount',
  initialState: '',
  reducers: {
    INPUT_AWSACCOUNT: (state, action) =>
      // input을 입력하면 state를 변경하는 reducer
      action.payload,
  },
});

export const { INPUT_AWSACCOUNT } = awsAccountSlice.actions;

export default awsAccountSlice.reducer;
