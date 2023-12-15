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


export async function getAwsTreeData() {
  // service list는 string list로 나옴
  // action crud는 _id에 service 명칭이 들어가 있고, 그 아래에 children으로 menu list가 있고
  // 그 아래에 menu 가 실제 서비스고 crud가 아 아래에 있음
  // 사실 service list는 없어도 되고 action crud만 있으면 됨
  //

  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/aws/actioncrud`, {
      
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('AWS Tree Data:', data);

    return (data?.aws_action_crud || []).map((item) => ({
      name: item._id,
      children: (item.menu_list || []).map((menu) => ({
        name: menu.menu,
        children: [
          {
            name: 'Create',
            children: menu.c?.map((action) => ({ name: action, children: [] })) || [],
          },
          {
            name: 'Read',
            children: menu.r?.map((action) => ({ name: action, children: [] })) || [],
          },
          {
            name: 'Update',
            children: menu.u?.map((action) => ({ name: action, children: [] })) || [],
          },
          {
            name: 'Delete',
            children: menu.d?.map((action) => ({ name: action, children: [] })) || [],
          },
        ],
      })),
    }));
  } catch (error) {
    console.error('Error fetching data from /aws/treedata:', error);
    throw error;
       
  }
}

  
// // CSP별 페이지 : AWS
// export async function getAwsUserList() {
//   try {
//     const response = await fetch(`${process.env.REACT_APP_MOCK_API}/aws/userlist`, {
      
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const data = await response.json();
//     console.log('AWS User List:', data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching data from /aws/userlist:', error);
//     throw error;
       
//   }
// }

 
