// AD 페이지 : AD - 그룹
async function getADGroupsList() {
    try {
      const response = await fetch(`${process.env.REACT_APP_MOCK_API}/window_ad/groups`, {
        
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('AD Group List:', data);
      return data;
    } catch (error) {
      console.error('Error fetching data from /window_ad/groups:', error);
      throw error;
         
    }
  }
  
  const ADGroupsData = await getADGroupsList();
  
  export const _ADGroupsList = [...Array(ADGroupsData.groups.length)].map((_, index) => ({
    id: `${index}`,
    name: ADGroupsData.groups[index].name,
    member: ADGroupsData.groups[index].member,
    num: ADGroupsData.groups[index].num,
    whenChanged: ADGroupsData.groups[index].whenChanged,
    description: ADGroupsData.groups[index].description,
  }));


  // AD 페이지 : AD - Users 페이지
  async function getADUsersList() {
    try {
      const response = await fetch(`${process.env.REACT_APP_MOCK_API}/window_ad/users`, {
        
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('AD Users List:', data);
      return data;
    } catch (error) {
      console.error('Error fetching data from /window_ad/users:', error);
      throw error;
         
    }
  }
  
  const ADUsersData = await getADUsersList();
  
  export const _ADUsersList = [...Array(ADUsersData.users.length)].map((_, index) => ({
    id: `${index}`,
    name: ADUsersData.users[index].name,
    title: ADUsersData.users[index].title,
    mail: ADUsersData.users[index].mail,
    lastLogon: ADUsersData.users[index].lastLogon,
    lastLogoff: ADUsersData.users[index].lastLogoff,
    pwdLastSet: ADUsersData.users[index].pwdLastSet,
  }));

  export const AD_OPTIONS = [
    { value: 'Groups', label: 'Groups' },
    { value: 'Users', label: 'Users' },
  ];