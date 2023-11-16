// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from 'src/redux'; // 루트 리듀서를 가져오세요

// const store = configureStore({
//   reducer: rootReducer,
//   // 미들웨어 및 기타 구성 옵션을 추가할 수 있습니다.
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';

import userNameReducer from '../reducer/userNameSlice';
import descriptionReducer from '../reducer/descriptionSlice';
import awsAccountReducer from '../reducer/awsAccountSlice';
import gcpAccountReducer from '../reducer/gcpAccountSlice';
import cspReducer from '../reducer/cspSlice';
import departmentReducer from '../reducer/departmentSlice';
import dutyReducer from '../reducer/dutySlice';
import attachedPositionReducer from '../reducer/attachedPositionSlice';
import attachedGroupReducer from '../reducer/attachedGroupSlice';

import positionSelectedReducer from '../reducer/position/positionSelectedRowSlice';

const store = configureStore({
  reducer: {
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
  },
});

export default store;
