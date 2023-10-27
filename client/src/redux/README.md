## How to import Redux?

### 1. file strucure

-redux
|- reducer

> |- index.js
> |- positionSelectedSlice.js
> |- userSelectedSlice.js
> |- store
> |- store.js

---

### 2. client/index.jsx에 store를 읽을 수 있도록 APP을 덮어준다.

```javascript
// index.jsx
<Provider store={store}>
  <APP />
</Provider>
```

이제 store.js 에서 변수를 참고하게된다.

\*\*물론 경로 설정 해줘야된다.

```javascript
import store from "./redux/store/store";
```

---

### 3. store.js 에서는 reducer폴더에 있는 파일에서 변수들을 찾아서 넣는다.

```javascript
// /redux/store/store.js

import { configureStore } from "@reduxjs/toolkit";
import positionSelectedReducer from "../reducer/positionSelectedSlice";

const store = configureStore({
  reducer: {
    positionSelected: positionSelectedReducer,
  },
});

export default store;
```

보면 `configureStore`를 하고 `reducer` 안에 넣는다. 굳이 `reducer` 안에 넣는 이유는, debeger같은 툴들 또한 store에서 사용하기 때문에 reducer 말고 다른 요소들이 추가될 수도 있기 때문이다.

---

### 4. Slice 파일 만들기, redux-toolkit의 장점

먼저 ~~Slice.js 파일을 보기 전에, store를 통해서 어떤 변수에 어떤 함수로 전달이 되는지 보고 가자.

##### ~~Slice.js 파일에서 변수를 저장하는 방식은 클래스와 같다.

##### 한 파일에 하나의 변수를 저장하고, 그에 해당하는 동작들을 미리 정의해놓는다.

##### 변수는 `state`

##### method는 `action`이다.

##### 파일에서 변수를 불러오고 싶다면 `state`를, 변수값을 변경하고 싶다면 `action`을 실행하면 된다.

먼저 활용부분부터 보도록 하자. row를 select 했을 때 DELETE_ROWS라는 action을 실행시키는 코드이다. 사실상 state를 불러오는 부분은 기능이 없는데, 그냥 넣어놨다.

**_코드를 다 볼 필요는 없다. `dispatch` 부분만 눈여겨 보도록 하자._**

```javascript
// src/_create/data_grid_import.jsx

import { useSelector, useDispatch } from "react-redux";

let positionSelected = null;
positionSelected = useSelector((state) => state.positionSelected);
const dispatch = useDispatch();
return (
  <DataGrid
    onRowSelectionModelChange={(newSelectionModel) => {
      setSelectedRows(newSelectionModel);
      checkboxSelected = data.filter((row) =>
        newSelectionModel.includes(row.id)
      );
      dispatch(DELETE_ROWS(checkboxSelected));
    }}
  />
);
```

대충 dispatch라는 함수로 `dispatch(액션명(페이로드))`를 보냈다는 걸 눈치 챌 것이다.

그럼 `state`의 자료형과 `DELETE_ROWS`를 어떻게 정의하는 지 이제 볼 차례이다.
드디어 `positionSelectedSlice.js` 를 볼 차례이다.

`positionSelectedSlice.js`에서 꼭 필요한 부분은 3가지이다.

1. initialState, state의 초기 값 (Class에서 변수를 init하는 부분)
2. CreateSlice, action 정의 (Class에서 method를 지정하는 부분)
3. export, state와 action을 export 해준다.

```javascript
// redux/reducer/positionSelectedSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  position_list: [],
};

const positionSelectedSlice = createSlice({
  name: "positionSelected", // state의 이름(웬만하면 일치하는 것이 좋다// 개인생각)
  initialState, // state의 초기 값
  reducers: {
    // action 정의
    DELETE_ROWS: (state, action) => {
      const removeRows = action.payload.map((row) => row.id);
      state.position_list = state.position_list.filter(
        (row) => !removeRows.includes(row.id)
      );
    },
  },
});

export const { DELETE_ROWS } = positionSelectedSlice.actions;
export default positionSelectedSlice.reducer;
```

결국 class들을 각각의 파일에서 관리하고, class들을 store에 모아 놓으면 나중에 useSelector와 useDispath로 변수와 메소드를 각각 불러와서 사용한다는 개념이다.

redux로 하면 불편한데, redux-toolkit을 사용하자. 공식문서에서 추천한다.

Class는 다른 객체들을 분신으로 찍어내는 것인데, state는 본인이 직접 변하는 것이라 글을 읽는데 힘들었을 수 있다. 그러나 좀 봐주면 좋겠다. 한번만 봐주라.

감사합니다.
