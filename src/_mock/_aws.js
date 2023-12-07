export async function getAwsServiceList() {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/aws/servicelist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('AWS Service List:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data from /aws/servicelist:', error);
    throw error;
  }
}

export async function getActionCrudData() {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/aws/actioncrud`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('Action Crud Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data from /aws/actioncrud:', error);
    throw error;
  }
}

export function _parseActionCrudData(data) {
  return (data?.aws_action_crud || []).map((item) => ({
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

// CSP별 페이지 : AWS
export async function getAwsUserList() {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/aws/userlist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('AWS User List:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data from /aws/userlist:', error);
    throw error;
  }
}
