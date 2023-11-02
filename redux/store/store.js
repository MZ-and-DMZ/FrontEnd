// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from 'src/redux'; // 루트 리듀서를 가져오세요

// const store = configureStore({
//   reducer: rootReducer,
//   // 미들웨어 및 기타 구성 옵션을 추가할 수 있습니다.
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import positionSelectedReducer from '../reducer/positionSelectedSlice';

const store = configureStore({
  reducer: {
    positionSelected: positionSelectedReducer,
  },
});

export default store;
