export async function getGcpServiceList() {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/gcp/servicelist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('GCP Service List:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data from /gcp/servicelist:', error);
    throw error;
  }
}

export async function getGcpActionCrudData() {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/gcp/actioncrud`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('Action Crud Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data from /gcp/actioncrud:', error);
    throw error;
  }
}

export function _parseGcpActionCrudData(data) {
  return (data?.gcp_action_crud || []).map((item) => ({
    actionCrudName: item._id,
    menuList: (item.menu_list || []).map((menu) => ({
      menu: menu.menu,
      createPermissions: menu.c || [],
      readPermissions: menu.r || [],
      updatePermissions: menu.u || [],
      deletePermissions: menu.d || [],
    })),
  }));
}


