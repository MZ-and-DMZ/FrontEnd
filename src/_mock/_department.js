async function DepartmentData() {
    try {
      const response = await fetch(`${process.env.REACT_APP_MOCK_API}/departments/list`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const departmentData = await DepartmentData();
  
  export const _departmentList = departmentData.department_list.map((department, index) => ({
    id: `${index}`,
    departmentName: department.department,
    awsRole: department.aws_role || [],
    gcpRole: department.gcp_role || [],
    adGpo: department.ad_gpo || [],
    keyCloakRole: department.keycloak_role || [],
  }));


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
  
  export const _userList = [...Array(userData.user_list.length)].map((_, index) => ({
    id: `${index}`,
    // id: index,
    userName: userData.user_list[index].userName,
    fullName: userData.user_list[index].fullName,
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