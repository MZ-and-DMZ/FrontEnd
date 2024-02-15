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

  // export async function DepartmentDetailData(departmentName) {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_MOCK_API}/departments/userlist/${departmentName}`);
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // const departmentDetailData = await DepartmentDetailData();

  export async function DepartmentDetailData(departmentName) {
    try {
        const response = await fetch(`${process.env.REACT_APP_MOCK_API}/departments/userlist/${departmentName}`);
        const data = await response.json();

        return data.user_list.map((user, index) => ({
            id: `${index}`,
            userName: user.userName,
            fullName: user.full_name,
            description: user.description,
            isMfaEnabled: user.isMfaEnabled,
            isImportantPerson: user.isImportantPerson,
            lastLoginTime: user.lastLoginTime,
            department: user.department,
            duty: user.duty,
            awsAccount: user.awsAccount,
            gcpAccount: user.gcpAccount,
            attachedPosition: user.attachedPosition,
            attachedGroup: user.attachedGroup,
            updatetime: user.updatetime,
            device: user.device,
            csp: (user.awsAccount && user.gcpAccount && 'AWS,GCP') ||
                (user.awsAccount && 'AWS') ||
                (user.gcpAccount && 'GCP') ||
                'none',
        }));
    } catch (error) {
        console.log(error);
    }
}



// const departmentDetailData = await DepartmentDetailData(selectedDepartmentName);
// const _departmentDetailList = departmentDetailData;

  
  // export const _departmentDetailList = [...Array(departmentDetailData.user_list.length)].map((_, index) => ({
  //   id: `${index}`,
  //   // id: index,
  //   userName: departmentDetailData.user_list[index].userName,
  //   fullName: departmentDetailData.user_list[index].full_name,
  //   description: departmentDetailData.user_list[index].description,
  //   isMfaEnabled: departmentDetailData.user_list[index].isMfaEnabled,
  //   isImportantPerson: departmentDetailData.user_list[index].isImportantPerson,
  //   lastLoginTime: departmentDetailData.user_list[index].lastLoginTime,
  //   department: departmentDetailData.user_list[index].department,
  //   duty: departmentDetailData.user_list[index].duty,
  //   awsAccount: departmentDetailData.user_list[index].awsAccount,
  //   gcpAccount: departmentDetailData.user_list[index].gcpAccount,
  //   attachedPosition: departmentDetailData.user_list[index].attachedPosition,
  //   attachedGroup: departmentDetailData.user_list[index].attachedGroup,
  //   updatetime: departmentDetailData.user_list[index].updatetime,
  //   device: departmentDetailData.user_list[index].device,
  //   csp:
  //     (departmentDetailData.user_list[index].awsAccount && departmentDetailData.user_list[index].gcpAccount && 'AWS,GCP') ||
  //     (departmentDetailData.user_list[index].awsAccount && 'AWS') ||
  //     (departmentDetailData.user_list[index].gcpAccount && 'GCP') ||
  //     'none',
  // }));

//   export async function _departmentDetailList(departmentName) {
//   try {
//     const response = await fetch(`${process.env.REACT_APP_MOCK_API}/users/${departmentName}`);
//     const departmentDetailData = await response.json();

//     if (!departmentDetailData) {
//       console.warn(`department data not available for ${departmentName}`);
//       return null;
//     }

//     const {
//       device,
//       department,
//       duty,
//       description,
//       awsAccount,
//       gcpAccount,
//       attachedPosition,
//       attachedGroup,
//       updatetime,
//       isMfaEnabled,
//       isRetire,
//       lastLoginTime,
//       isImportantPerson,
//       userName: userUserName,
//     } = departmentDetailData;

//     const awsKeys = awsAccount?.managedKeys || [];
//     const usedAwsKeys = awsAccount?.usedKeys || [];
//     const gcpKeys = gcpAccount?.managedKeys || [];
//     const usedGcpKeys = gcpAccount?.usedKeys || [];

//     return {
//       device,
//       department,
//       duty,
//       description,
//       awsKeys,
//       usedAwsKeys,
//       gcpKeys,
//       usedGcpKeys,
//       attachedPosition,
//       attachedGroup,
//       updatetime,
//       isMfaEnabled,
//       isRetire,
//       lastLoginTime,
//       isImportantPerson,
//       userName: userUserName,
//     };

//   } catch (error) {
//     console.error('Error fetching department detail data:', error);
//     throw error;
//   }
// }


// _departmentDetailData 테스트용 코드
// const departmentNameToCheck = 'Frontend'; 

// try {
//   const departmentDetailData = await _departmentDetailList(departmentNameToCheck);
//   console.log('Parsed Department Detail Data:', departmentDetailData);
// } catch (error) {
//   console.error('Error occurred while fetching department detail data:', error);
// }