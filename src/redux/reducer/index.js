// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import attachedPositionReducer from './user/create/attachedPositionSlice';
import userNameReducer from './user/create/userNameSlice';
import descriptionReducer from './user/create/descriptionSlice';
import awsAccountReducer from './user/create/awsAccountSlice';
import gcpAccountReducer from './user/create/gcpAccountSlice';
import cspReducer from './user/create/cspSlice';
import departmentReducer from './user/create/departmentSlice';
import dutyReducer from './user/create/dutySlice';
import attachedGroupReducer from './user/create/attachedGroupSlice';

import positionSelectedReducer from './position/create/step3Slice';

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
