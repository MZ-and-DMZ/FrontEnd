### 할일 1. EDIT Page 구현

#### EDIT 디자인은 기존 Create 코드를 그대로 사용하자.

1. edit 페이지 구현해야되는데, 그를 위해서 기존 페이지와 동일한 페이지를 재사용 할 수 있게 파일을 통합하는 게 필요함.
2. UserEditForm과 DataTable에 currentUser 값을 넣어줘야됨.
3. 그러려면 View 파일에서 DataTable을 분리해야됨.
4. DataTable을 분리할 거면 안에 있는 DataGridImport 와 DataGridView이 종속되기 때문에 문제가 발생함.
5. DataGridImport와 DataGridView 파일을 위치를 변경하자니 위치와 통일성이 너무 깨짐.
6. ~Import, ~View 파일을 컴포넌트 폴더에 넣고, 나중에 재활용 할 수 있게 아예 손을 대자.
7. 통합해서 파라미터만 다르게 전달하면 다른 역할을 하게끔 파일을 통합하고 컴포넌트 폴더에 넣음.

### 할일 2. POST 전송

#### 이때 POST가 잘 보내지도록 바꿔야됨

1. view에서는 form, multi-table 컴포넌트만 있음.
2. view에서 '확인'버튼을 누르면 form과 multi-table 값을 전송해야됨.
3. 그를 위해서 redux로 변수를 저장해서
4. 나머지를 보내면 끝.

### 할일 3. DELETE 전송

1. 기존 휴지통 버튼을 DELETE 하고
2. List를 업데이트 해서 나타내면 됨. (useEffect 써서 변경 감지)
3. 불가능 하면 어쩌지 ㅠㅠ
