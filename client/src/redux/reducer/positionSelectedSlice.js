import { createSlice } from '@reduxjs/toolkit';

// const _dataGrid = [...Array(20)].map((_, index) => ({
//   id: positionData.position_list[index]._id.$oid,
//   positionName: positionData.position_list[index].positionName,
//   isCustom: positionData.position_list[index].isCustom,
//   description: positionData.position_list[index].description,
//   csp: positionData.position_list[index].csp,
//   policies: positionData.position_list[index].policies,
// })
const initialState = {
  position_list: [
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
  ],
};

// const selectedSlice = createSlice({
//   name: 'mange',
//   initialState,
//   reducers: {
//     ADD_ROWS: (state, action) => {
//       state.name.push(action.payload);
//     },
//     DELETE_ROWS: (state, action) => {
//       const newName = state.id.filter((id) => id !== action.payload.id);
//       state.name = newName;
//     },
//   },
// });

const positionSelectedSlice = createSlice({
  name: 'positionSelected',
  initialState,
  reducers: {
    // ADD_ROWS: (state, action) => {
    //   state.position_list.push(action.payload);
    // },
    ADD_ROWS: (state, action) => {
      // if state에 이미 존재하면 action.payload를 추가하지 않음
      const addRows = action.payload.filter(
        (row) => !state.position_list.some((r) => r.id === row.id)
      );
      state.position_list.push(...addRows);
    },
    DELETE_ROWS: (state, action) => {
      const removeRows = action.payload.map((row) => row.id);
      state.position_list = state.position_list.filter((row) => !removeRows.includes(row.id));
    },
    // MODIFY_ROWS: (state, action) => {
    //   const idsToModify = action.payload; // payload로 수정할 id 배열을 받음
    //   state.position_list = state.position_list.filter((row) => !idsToModify.includes(row.id));
    // },
    EDIT_ROWS: (state, action) => {
      state.position_list = action.payload;
    },
  },
});

export const { ADD_ROWS, EDIT_ROWS, DELETE_ROWS } = positionSelectedSlice.actions;
export default positionSelectedSlice.reducer;
