export const USER_CSP_OPTIONS = [
  { value: 'AWS,GCP', label: 'AWS,GCP' },
  { value: 'AWS', label: 'AWS' },
  { value: 'GCP', label: 'GCP' },
  
  // { value: 'rejected', label: 'Rejected' },
];

async function UserData() {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_MOCK_API}/boch/get/userlist`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const userData = await UserData();

export const _userList = [...Array(userData.user_list.length)].map(
  (_, index) => ({
    id: userData.user_list[index]._id.$oid,
    userName: userData.user_list[index].userName,
    description: userData.user_list[index].description,
    awsAccount: userData.user_list[index].awsAccount,
    gcpAccount: userData.user_list[index].gcpAccount,
    attachedPosition: userData.user_list[index].attachedPosition,
    attachedGroup: userData.user_list[index].attachedGroup,
    updatetime: userData.user_list[index].updatetime,
    csp:
      (userData.user_list[index].awsAccount &&
        userData.user_list[index].gcpAccount &&
        "AWS,GCP") ||
      (userData.user_list[index].awsAccount && "AWS") ||
      (userData.user_list[index].gcpAccount && "GCP") ||
      "none",
  }),
);