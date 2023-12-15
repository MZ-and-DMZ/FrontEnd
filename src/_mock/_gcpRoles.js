async function GcpRoleData() {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/gcp/role/list`, {
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

export default function getGcpRoleDescription(roleName) {
  const gcpRoles = gcpRoleData.gcp_role_list;
  const foundRole = gcpRoles.find((role) => role.RoleName === roleName);
  return foundRole ? foundRole.Description : 'Description not found';
}
console.log(gcpRoleData);
export const _gcpRoleList = [...Array(gcpRoleData.gcp_role_list.length)].map((_, index) => ({
  id: index + 1000000,
  name: gcpRoleData.gcp_role_list[index].title,
  gcpName: gcpRoleData.gcp_role_list[index]._id,
  description: gcpRoleData.gcp_role_list[index].description,
  // includedPermissions: gcpRoleData.gcp_role_list[index].includedPermissions,
  // stage: gcpRoleData.gcp_role_list[index].stage,
  // etag: gcpRoleData.gcp_role_list[index].etag,
  csp: 'gcp',
}));
