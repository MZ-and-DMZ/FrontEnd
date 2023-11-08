export const USER_CSP_OPTIONS = [
  { value: 'AWS,GCP', label: 'AWS,GCP' },
  { value: 'AWS', label: 'AWS' },
  { value: 'GCP', label: 'GCP' },

  // { value: 'rejected', label: 'Rejected' },
];

async function UserData() {
  try {

    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/users/list`);

    const response = await fetch(
      `${process.env.REACT_APP_MOCK_API}/users/list`,
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const userData = await UserData();


export const _userList = [...Array(userData.user_list.length)].map((_, index) => ({
  id: userData.user_list[index].userName,
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

export const _userList = [...Array(userData.user_list.length)].map(
  (_, index) => ({
    id: userData.user_list[index].userName,
    userName: userData.user_list[index].userName,
    description: userData.user_list[index].description,
    awsAccount: userData.user_list[index].awsAccount,
    gcpAccount: userData.user_list[index].gcpAccount,
    attachedPosition: userData.user_list[index].attachedPosition,
    attachedGroup: userData.user_list[index].attachedGroup,
    department: userData.user_list[index].department,
    duty: userData.user_list[index].duty,
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

export async function createUser(data) {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/users/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: data.name,
        description: data['position description'],
        csp: data.csp,
        policies: [], 
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } 
      throw new Error('Failed to create position');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

