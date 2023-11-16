import { createSlice } from '@reduxjs/toolkit';

// const _dataGrid = [...Array(20)].map((_, index) => ({
//   id: positionData.position_list[index]._id.$oid,
//   positionName: positionData.position_list[index].positionName,
//   isCustom: positionData.position_list[index].isCustom,
//   description: positionData.position_list[index].description,
//   csp: positionData.position_list[index].csp,
//   policies: positionData.position_list[index].policies,
// })
const initialState = [
  // {
  //   id: '000000000000000000000000',
  //   positionName: 'example 1',
  //   isCustom: true,
  //   description: 'empty',
  //   csp: 'gcp',
  //   policies: ['AmazonEC2FullAccess', 'roles/iam-role-ec2-readonly'],
  // },
  // {
  //   id: '000000000000000000000001',
  //   positionName: 'example 2',
  //   isCustom: true,
  //   description: 'empty',
  //   csp: 'aws',
  //   policies: ['AmazonEC2FullAccess'],
  // },
];

const positionSelectedSlice = createSlice({
  name: 'positionSelected',
  initialState,
  reducers: {
    // ADD_ROWS: (state, action) => {
    //   state.position_list.push(action.payload);
    // },
    ADD_ROWS: (state, action) => {
      // if state에 이미 존재하면 action.payload를 추가하지 않음
      const addRows = action.payload.filter((row) => !state.some((r) => r.id === row.id));
      return [...state, addRows];
    },
    DELETE_ROWS: (state, action) => {
      const removeRows = action.payload.map((row) => row.id);
      state = state.filter((row) => !removeRows.includes(row.id));
      console.log('state');
    },
    // MODIFY_ROWS: (state, action) => {
    //   const idsToModify = action.payload; // payload로 수정할 id 배열을 받음
    //   state.position_list = state.position_list.filter((row) => !idsToModify.includes(row.id));
    // },
    EDIT_ROWS: (state, action) => {
      const rowdata = action.payload;
      const id = rowdata.id;

      // 이미 존재하는지 확인
      const existingIndex = state.findIndex((row) => row.id === id);

      if (existingIndex !== -1) {
        // 이미 존재하는 경우, 새로운 상태 객체를 반환하여 해당 행을 제거
        state = state.filter((row) => row.id !== id);
      } else {
        // 존재하지 않는 경우, id 속성을 추가하고 현재 상태와 새로운 행을 합친 새로운 상태 객체 반환
        state = [...state, { id, ...rowdata }];
      }
    },
  },
});

export const { ADD_ROWS, EDIT_ROWS, DELETE_ROWS } = positionSelectedSlice.actions;
export default positionSelectedSlice.reducer;
