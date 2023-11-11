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
  awsAccount: userData.user_list[index].awsAccount,
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

export function sendUserData(editedUser, _ruduxList) {
  const jsondata = JSON.stringify({
    description: editedUser.description,
    awsAccount: editedUser.awsAccount,
    gcpAccount: '',
    attachedPosition: _ruduxList.map((item) => item.positionName),
    attachedGroup: editedUser.attachedGroup,
  });
  console.info('jsondata', jsondata);
  console.log(editedUser.userName);
  // fetch(`${process.env.REACT_APP_MOCK_API}/users/update/${editedUser.userName}`, {
  fetch(`http://54.180.76.116:8080/users/update/${editedUser.userName}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      department: 'string',
      duty: 'string',
      description: editedUser.description,
      awsAccount: editedUser.awsAccount,
      gcpAccount: '',
      attachedPosition: _ruduxList.map((item) => item.positionName),
      attachedGroup: editedUser.attachedGroup,
    }),
  })
    .then((res) => res.json())
    .then((res) => console.log('Success:', res));

  console.log(_ruduxList.map((item) => item.positionName));
}
