async function UserData() {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/users/list`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const userData = await UserData();

export const USER_CSP_OPTIONS = [
  { value: 'AWS,GCP', label: 'AWS,GCP' },
  { value: 'AWS', label: 'AWS' },
  { value: 'GCP', label: 'GCP' },
];
export const _userList = [...Array(userData.user_list.length)].map((_, index) => ({
  id: `${index}`,
  // id: index,
  userName: userData.user_list[index].userName,
  description: userData.user_list[index].description,
  isMfaEnabled: userData.user_list[index].isMfaEnabled,
  lastLoginTime: userData.user_list[index].lastLoginTime,
  department: userData.user_list[index].department,
  duty: userData.user_list[index].duty,
  awsAccount: Array.isArray(userData.user_list[index].awsAccount)
    ? userData.user_list[index].awsAccount.map((awsAcc) => ({
        id: awsAcc.id,
        lastLoginTime: awsAcc.lastLoginTime?.$date,
        isMfaEnabled: awsAcc.isMfaEnabled,
        managedKeys: {
          keyId: awsAcc.managedKeys?.keyId,
          createDate: awsAcc.managedKeys?.createDate?.$date,
          keyExpirationDate: awsAcc.managedKeys?.keyExpirationDate?.$date,
        },
        usedKeys: {
          keyId: awsAcc.usedKeys?.keyId,
          createDate: awsAcc.usedKeys?.createDate?.$date,
          keyExpirationDate: awsAcc.usedKeys?.keyExpirationDate?.$date,
        },
      }))
    : null,
  gcpAccount: userData.user_list[index].gcpAccount,
  attachedPosition: userData.user_list[index].attachedPosition,
  attachedGroup: userData.user_list[index].attachedGroup,
  updatetime: userData.user_list[index].updatetime,
  csp:
    (userData.user_list[index].awsAccount && userData.user_list[index].gcpAccount && 'AWS,GCP') ||
    (userData.user_list[index].awsAccount && 'AWS') ||
    (userData.user_list[index].gcpAccount && 'GCP') ||
    'none',
}));

export function editUserData(currentUser, _reduxList) {
  const jsondata = JSON.stringify({
    description: _reduxList.description,
    awsAccount: _reduxList.awsAccount,
    gcpAccount: _reduxList.gcpAccount,
    attachedPosition: _reduxList.attachedPosition,
    attachedGroup: _reduxList.attachedGroup,
  });
  console.info('jsondata', jsondata);
  console.log('editUserData userName', currentUser.userName);
  // fetch(`${process.env.REACT_APP_MOCK_API}/users/update/${editedUser.userName}`, {
  fetch(`${process.env.REACT_APP_MOCK_API}/users/update/${currentUser.userName}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      department: _reduxList.department,
      duty: _reduxList.duty,
      description: _reduxList.description,
      awsAccount: _reduxList.awsAccount,
      gcpAccount: _reduxList.gcpAccount,
      attachedPosition: _reduxList.attachedPosition,
      attachedGroup: _reduxList.attachedGroup,
    }),
  })
    .then((res) => res.json())
    .then((res) => console.log('Success:', res));

  console.log(_reduxList.map((item) => item.positionName));
}

export function createUserData(_reduxList) {
  const jsondata = JSON.stringify({
    userName: _reduxList.userName,
    description: _reduxList.description,
    awsAccount: _reduxList.awsAccount,
    gcpAccount: _reduxList.gcpAccount,
    attachedPosition: _reduxList.attachedPosition,
    attachedGroup: [],
    duty: _reduxList.duty,
    department: _reduxList.department,
  });
  console.info(
    'reduxPositionList',
    _reduxList.attachedPosition.map((item) => item.positionName)
  );
  console.info('reduxList', _reduxList);
  // fetch(`${process.env.REACT_APP_MOCK_API}/users/create`, {
  fetch(`${process.env.REACT_APP_MOCK_API}/users/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName: _reduxList.userName,
      description: _reduxList.description,
      awsAccount: _reduxList.awsAccount,
      gcpAccount: _reduxList.gcpAccount,
      attachedPosition: _reduxList.attachedPosition.map((item) => item.positionName),
      attachedGroup: [],
      duty: _reduxList.duty,
      department: _reduxList.department,
    }),
  })
    .then((res) => res.json())
    .then((res) => console.log('Success:', res));
}