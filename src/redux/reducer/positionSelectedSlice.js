import { createSlice } from '@reduxjs/toolkit';

const userNameSlice = createSlice({
  name: 'userName',
  initialState: '',
  reducers: {
    INPUT_USERNAME: (state, action) => {
      let newState = null;
      newState = state;
      newState.userName = null;
      newState.userName = action.payload;
      return newState;
    },
  },
});

const descriptionSlice = createSlice({
  name: 'description',
  initialState: '',
  reducers: {
    INPUT_DESCRIPTION: (state, action) => {
      let newState = null;
      newState = state;
      newState.description = null;
      newState.description = action.payload;

      return newState;
    },
  },
});

const awsAccountSlice = createSlice({
  name: 'awsAccount',
  initialState: '',
  reducers: {
    INPUT_AWSACCOUNT: (state, action) => {
      let newState = null;
      newState = state;
      newState.awsAccount = null;
      newState.awsAccount = action.payload;
      return newState;
    },
  },
});

const gcpAccountSlice = createSlice({
  name: 'gcpAccount',
  initialState: '',
  reducers: {
    INPUT_GCPCACCOUNT: (state, action) => {
      let newState = null;
      newState = state;
      newState.gcpAccount = null;
      newState.gcpAccount = action.payload;
      return newState;
    },
  },
});

const cspSlice = createSlice({
  name: 'csp',
  initialState: '',
  reducers: {
    INPUT_CSP: (state, action) => {
      let newState = null;
      newState = state;
      newState.csp = null;
      newState.csp = action.payload;
      return newState;
    },
  },
});

const positionSelectedSlice = createSlice({
  name: 'positionSelected',
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

export const { INIT_ROWS, ADD_ROWS, EDIT_ROWS, DELETE_ROWS } = positionSelectedSlice.actions;
export const { INPUT_USERNAME } = userNameSlice.actions;
export const { INPUT_DESCRIPTION } = descriptionSlice.actions;
export const { INPUT_AWSACCOUNT } = awsAccountSlice.actions;
export const { INPUT_GCPCACCOUNT } = gcpAccountSlice.actions;
export const { INPUT_CSP } = cspSlice.actions;

export default {
  positionSelected: positionSelectedSlice.reducer,
  userName: userNameSlice.reducer,
  description: descriptionSlice.reducer,
  awsAccount: awsAccountSlice.reducer,
  gcpAccount: gcpAccountSlice.reducer,
  csp: cspSlice.reducer,
};
