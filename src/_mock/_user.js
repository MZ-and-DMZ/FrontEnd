import { current } from "@reduxjs/toolkit";

// async function UserData() {
//   try {
//     const response = await fetch(`${process.env.REACT_APP_MOCK_API}/users/list`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

async function UserData() {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/departments/userlist/Frontend`);
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
  fullName: userData.user_list[index].full_name,
  awsRole: userData.user_list[index].aws_role,
  gcpRole: userData.user_list[index].gcp_role,
  adGpo: userData.user_list[index].ad_gpo,
  keyCloakRole: userData.user_list[index].keycloak_role,
  description: userData.user_list[index].description,
  isMfaEnabled: userData.user_list[index].isMfaEnabled,
  isImportantPerson: userData.user_list[index].isImportantPerson,
  lastLoginTime: userData.user_list[index].lastLoginTime,
  department: userData.user_list[index].department,
  duty: userData.user_list[index].duty,
  awsAccount: userData.user_list[index].awsAccount,
  // awsAccount: Array.isArray(userData.user_list[index].awsAccount)
  //   ? userData.user_list[index].awsAccount.map((awsAcc) => ({
  //       id: awsAcc.id,
  //       lastLoginTime: awsAcc.lastLoginTime?.$date,
  //       isMfaEnabled: awsAcc.isMfaEnabled,
  //       managedKeys: {
  //         keyId: awsAcc.managedKeys?.keyId,
  //         createDate: awsAcc.managedKeys?.createDate?.$date,
  //         keyExpirationDate: awsAcc.managedKeys?.keyExpirationDate?.$date,
  //       },
  //       usedKeys: {
  //         keyId: awsAcc.usedKeys?.keyId,
  //         createDate: awsAcc.usedKeys?.createDate?.$date,
  //         keyExpirationDate: awsAcc.usedKeys?.keyExpirationDate?.$date,
  //       },
  //     }))
  //   : null,
  gcpAccount: userData.user_list[index].gcpAccount,
  attachedPosition: userData.user_list[index].attachedPosition,
  attachedGroup: userData.user_list[index].attachedGroup,
  updatetime: userData.user_list[index].updatetime,
  device: userData.user_list[index].device,
  csp:
    (userData.user_list[index].awsAccount && userData.user_list[index].gcpAccount && 'AWS,GCP') ||
    (userData.user_list[index].awsAccount && 'AWS') ||
    (userData.user_list[index].gcpAccount && 'GCP') ||
    'none',
}));

// _userList.forEach((user) => {
//   console.log(user.lastLoginTime);
//   console.log(user.gcpAccount);
// });
// console.log(_userList);
// console.log(_userList.lastLoginTime);
// console.log(_userList.gcpAccount);

// console.log(userData.device);

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
      device: _reduxList.device,
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
    device: _reduxList.device,
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

export async function _userDetailList(userName) {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/users/${userName}`);
    const userDetailData = await response.json();

    if (!userDetailData) {
      console.warn(`User data not available for ${userName}`);
      return null;
    }

    const {
      device,
      department,
      duty,
      description,
      awsAccount,
      gcpAccount,
      attachedPosition,
      attachedGroup,
      updatetime,
      isMfaEnabled,
      isRetire,
      lastLoginTime,
      isImportantPerson,
      userName: userUserName,
    } = userDetailData;

    const awsKeys = awsAccount?.managedKeys || [];
    const usedAwsKeys = awsAccount?.usedKeys || [];
    const gcpKeys = gcpAccount?.managedKeys || [];
    const usedGcpKeys = gcpAccount?.usedKeys || [];

    return {
      device,
      department,
      duty,
      description,
      awsKeys,
      usedAwsKeys,
      gcpKeys,
      usedGcpKeys,
      attachedPosition,
      attachedGroup,
      updatetime,
      isMfaEnabled,
      isRetire,
      lastLoginTime,
      isImportantPerson,
      userName: userUserName,
    };

  } catch (error) {
    console.error('Error fetching user detail data:', error);
    throw error;
  }
}


// _userDetailData 테스트용 코드
const userNameToCheck = 'alice'; 

try {
  const userDetailData = await _userDetailList(userNameToCheck);
  console.log('Parsed User Detail Data:', userDetailData);
} catch (error) {
  console.error('Error occurred while fetching user detail data:', error);
}
