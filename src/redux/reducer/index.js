// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import attachedPositionReducer from './attachedPositionSlice';
import userNameReducer from './userNameSlice';
import descriptionReducer from './descriptionSlice';
import awsAccountReducer from './awsAccountSlice';
import gcpAccountReducer from './gcpAccountSlice';
import cspReducer from './cspSlice';
import departmentReducer from './departmentSlice';
import dutyReducer from './dutySlice';
import attachedGroupReducer from './attachedGroupSlice';

import positionSelectedReducer from '../reducer/position/positionSelectedRowSlice';

// import userSelectedReducer from './userSelectedSlice';

const rootReducer = combineReducers({
  userName: userNameReducer,
  description: descriptionReducer,
  awsAccount: awsAccountReducer,
  gcpAccount: gcpAccountReducer,
  csp: cspReducer,
  department: departmentReducer,
  duty: dutyReducer,
  attachedGroup: attachedGroupReducer,
  attachedPosition: attachedPositionReducer,
  positionSelectedRow: positionSelectedReducer,
  // userSelected: userSelectedReducer,
  // 다른 슬라이스 리듀서를 추가할 수 있습니다.
});

export default rootReducer;
