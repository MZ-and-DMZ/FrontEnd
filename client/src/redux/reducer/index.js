// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import positionSelectedReducer from './positionSelectedSlice';
// import userSelectedReducer from './userSelectedSlice';

const rootReducer = combineReducers({
  positionSelected: positionSelectedReducer,
  // userSelected: userSelectedReducer,
  // 다른 슬라이스 리듀서를 추가할 수 있습니다.
});

export default rootReducer;
