import { createSlice } from '@reduxjs/toolkit';

const attachedPositionSlice = createSlice({
  name: 'attachedPosition',
  initialState: [],
  reducers: {
    INIT_ROWS: (state, action) => action.payload,
    ADD_ROWS: (state, action) => {
      const newRows = action.payload;
      const existingIds = new Set(state.map((row) => row.id));
      return [...state, ...newRows.filter((row) => !existingIds.has(row.id))];
    },
    DELETE_ROWS: (state, action) => {
      const idsToRemove = action.payload.map((row) => row.id);
      return state.filter((row) => !idsToRemove.includes(row.id));
    },
    EDIT_ROWS: (state, action) => {
      const updatedRow = action.payload;
      const id = updatedRow.id;

      // 유효한 id를 가진 행만 업데이트
      if (id) {
        const existingIndex = state.findIndex((row) => row.id === id);
        if (existingIndex !== -1) {
          state.splice(existingIndex, 1, updatedRow);
          return [...state]; // 새로운 배열을 반환하여 불변성 유지
        }
        return [...state, updatedRow]; // 새로운 배열을 반환하여 불변성 유지
      }
      // id가 없는 행은 그냥 현재 상태를 반환
      return state;
    },
  },
});

export const { INIT_ROWS, ADD_ROWS, EDIT_ROWS, DELETE_ROWS } = attachedPositionSlice.actions;

export default attachedPositionSlice.reducer;
