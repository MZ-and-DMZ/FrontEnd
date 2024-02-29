import { current } from "@reduxjs/toolkit";

async function UserData() {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/users/list`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// async function UserData(departmentName) {
//   try {
//     const response = await fetch(`${process.env.REACT_APP_MOCK_API}/departments/userlist/${departmentName}`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

const userData = await UserData();

export const USER_CSP_OPTIONS = [
  { value: 'AWS,GCP', label: 'AWS,GCP' },
  { value: 'AWS', label: 'AWS' },
  { value: 'GCP', label: 'GCP' },
];

export const _userList = userData.user_list.map((user, index) => {
  const awsAccount = user.awsAccount;
  const formatKeyInfo = (keys) => keys.map(key => ({
    keyId: key.keyId,
    createDate: key.createDate?.$date,
    expirationDate: key.expirationDate?.$date,
  }));

  return {
    id: `${index}`,
    userName: user.userName,
    fullName: user.full_name,
    awsRole: user.aws_role,
    gcpRole: user.gcp_role,
    adGpo: user.ad_gpo,
    keyCloakRole: user.keycloak_role,
    description: user.description,
    isMfaEnabled: user.isMfaEnabled,
    isImportantPerson: user.isImportantPerson,
    lastLoginTime: user.lastLoginTime,
    department: user.department,
    duty: user.duty,
    awsAccount: awsAccount ? {
      id: awsAccount._id,
      attachedPolicies: awsAccount.AttachedPolicies.map(policy => ({
        policyName: policy.PolicyName,
        policyArn: policy.PolicyArn
      })),
      createDate: awsAccount.CreateDate?.$date,
      groups: awsAccount.Groups,
      userName: awsAccount.UserName,
      isMfaEnabled: awsAccount.isMfaEnabled,
      managedKeys: awsAccount.managedKeys ? formatKeyInfo(awsAccount.managedKeys) : [],
      usedKeys: awsAccount.usedKeys ? formatKeyInfo(awsAccount.usedKeys) : [],
      // managedKeys: awsAccount.managedKeys.map(key => ({
      //   keyId: key,
      //   createDate: key.createDate?.$date, // Change this to your preferred value
      //   keyExpirationDate: key.keyExpirationDate?.$date, // Change this to your preferred value
      // })),
      // usedKeys: awsAccount.usedKeys.map(key => ({
      //   keyId: key,
      //   createDate: null, // Change this to your preferred value
      //   keyExpirationDate: null, // Change this to your preferred value
      // })),
    } : null,
    gcpAccount: user.gcpAccount,
    attachedPosition: user.attachedPosition,
    attachedGroup: user.attachedGroup,
    updatetime: user.updatetime,
    device: user.device,
    csp:
      (awsAccount && user.gcpAccount && 'AWS,GCP') ||
      (awsAccount && 'AWS') ||
      (user.gcpAccount && 'GCP') ||
      'none',
  };
});

console.log(_userList);

// export const _userList = [...Array(userData.user_list.length)].map((_, index) => ({
//   id: `${index}`,
//   // id: index,
//   userName: userData.user_list[index].userName,
//   fullName: userData.user_list[index].full_name,
//   awsRole: userData.user_list[index].aws_role,
//   gcpRole: userData.user_list[index].gcp_role,
//   adGpo: userData.user_list[index].ad_gpo,
//   keyCloakRole: userData.user_list[index].keycloak_role,
//   description: userData.user_list[index].description,
//   isMfaEnabled: userData.user_list[index].isMfaEnabled,
//   isImportantPerson: userData.user_list[index].isImportantPerson,
//   lastLoginTime: userData.user_list[index].lastLoginTime,
//   department: userData.user_list[index].department,
//   duty: userData.user_list[index].duty,
//   // awsAccount: userData.user_list[index].awsAccount,
//   awsAccount: userData.user_list[index].awsAccount
//     ? {
//         id: userData.user_list[index].awsAccount.id,
//         lastLoginTime: userData.user_list[index].awsAccount.lastLoginTime ? userData.user_list[index].awsAccount.lastLoginTime.$date : null,
//         isMfaEnabled: userData.user_list[index].awsAccount.isMfaEnabled,
//         managedKeys: userData.user_list[index].awsAccount.managedKeys.map((key) => ({
//           keyId: key.keyId,
//           createDate: key.createDate ? key.createDate.$date : null,
//           keyExpirationDate: key.keyExpirationDate ? key.keyExpirationDate.$date : null,
//         })),
//         usedKeys: userData.user_list[index].awsAccount.usedKeys.map((key) => ({
//           keyId: key.keyId,
//           createDate: key.createDate ? key.createDate.$date : null,
//           keyExpirationDate: key.keyExpirationDate ? key.keyExpirationDate.$date : null,
//         })),
//       }
//     : null,
//   gcpAccount: userData.user_list[index].gcpAccount,
//   attachedPosition: userData.user_list[index].attachedPosition,
//   attachedGroup: userData.user_list[index].attachedGroup,
//   updatetime: userData.user_list[index].updatetime,
//   device: userData.user_list[index].device,
//   csp:
//     (userData.user_list[index].awsAccount && userData.user_list[index].gcpAccount && 'AWS,GCP') ||
//     (userData.user_list[index].awsAccount && 'AWS') ||
//     (userData.user_list[index].gcpAccount && 'GCP') ||
//     'none',
// }));

// console.log(_userList);

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
// const userNameToCheck = 'alice'; 

// try {
//   const userDetailData = await _userDetailList(userNameToCheck);
//   console.log('Parsed User Detail Data:', userDetailData);
// } catch (error) {
//   console.error('Error occurred while fetching user detail data:', error);
// }
