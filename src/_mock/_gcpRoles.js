async function GcpRoleData() {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/boch/get/gcp/rolelist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const gcpRoleData = await GcpRoleData();

function getGcpRoleDescription(roleName) {
  const gcpRoles = gcpRoleData.gcp_role_list;
  const foundRole = gcpRoles.find(role => role.RoleName === roleName);
  return foundRole ? foundRole.Description : 'Description not found';
}

export const _gcpRoleList = [...Array(gcpRoleData.gcp_role_list.length)].map((_, index) => ({
  id: gcpRoleData.gcp_role_list[index]._id.$oid,
  name: gcpRoleData.gcp_role_list[index].name,
  title: gcpRoleData.gcp_role_list[index].title,
  description: gcpRoleData.gcp_role_list[index].description,
  includedPermissions: gcpRoleData.gcp_role_list[index].includedPermissions.map((permission) => Object.keys(permission)[0]),
  stage: gcpRoleData.gcp_role_list[index].stage,
}));
