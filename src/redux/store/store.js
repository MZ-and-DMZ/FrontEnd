// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from 'src/redux'; // 루트 리듀서를 가져오세요

// const store = configureStore({
//   reducer: rootReducer,
//   // 미들웨어 및 기타 구성 옵션을 추가할 수 있습니다.
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';

// user
// user list
import userSelectedReducer from '../reducer/user/list/userSelectedSlice';
// user create
import userNameReducer from '../reducer/user/create/userNameSlice';
import descriptionReducer from '../reducer/user/create/descriptionSlice';
import awsAccountReducer from '../reducer/user/create/awsAccountSlice';
import gcpAccountReducer from '../reducer/user/create/gcpAccountSlice';
import cspReducer from '../reducer/user/create/cspSlice';
import departmentReducer from '../reducer/user/create/departmentSlice';
import dutyReducer from '../reducer/user/create/dutySlice';
import attachedPositionReducer from '../reducer/user/create/attachedPositionSlice';
import attachedGroupReducer from '../reducer/user/create/attachedGroupSlice';

// position
// position list
import positionSelectedReducer from '../reducer/position/list/positionSelectedSlice';
// position create
import step1Reducer from '../reducer/position/create/step1Slice';
import step2Reducer from '../reducer/position/create/step2Slice';
import step3Reducer from '../reducer/position/create/step3Slice';

const store = configureStore({
  reducer: {
    // user
    // user list
    userSelected: userSelectedReducer,
    // user create
    userName: userNameReducer,
    description: descriptionReducer,
    awsAccount: awsAccountReducer,
    gcpAccount: gcpAccountReducer,
    csp: cspReducer,
    department: departmentReducer,
    duty: dutyReducer,
    attachedGroup: attachedGroupReducer,
    attachedPosition: attachedPositionReducer,

    // position
    // position list
    positionSelected: positionSelectedReducer,
    // position create
    step1: step1Reducer,
    step2: step2Reducer,
    step3: step3Reducer,
  },
});

export default store;
