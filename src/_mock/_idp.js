// IdP 페이지 : IdP - 그룹
async function getIdpGroupsList() {
    try {
      const response = await fetch(`${process.env.REACT_APP_MOCK_API}/idp/keycloak/groups`, {
        
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('IdP Group List:', data);
      return data;
    } catch (error) {
      console.error('Error fetching data from /idp/keycloak/groups:', error);
      throw error;
         
    }
  }
  
  const IdpGroupsData = await getIdpGroupsList();
  
  export const _IdPGroupsList = [...Array(IdpGroupsData.groups.length)].map((_, index) => ({
    id: `${index}`,
    name: IdpGroupsData.groups[index].name,
    members: IdpGroupsData.groups[index].members,
    num: IdpGroupsData.groups[index].num,
    client_roles: IdpGroupsData.groups[index].client_roles,
  }));


  // IdP 페이지 : IdP - Users 페이지
  async function getIdpUsersList() {
    try {
      const response = await fetch(`${process.env.REACT_APP_MOCK_API}/idp/keycloak/users`, {
        
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('IdP Users List:', data);
      return data;
    } catch (error) {
      console.error('Error fetching data from /idp/keycloak/users:', error);
      throw error;
         
    }
  }
  
  const IdpUsersData = await getIdpUsersList();
  
  export const _IdPUsersList = [...Array(IdpUsersData.users.length)].map((_, index) => ({
    id: `${index}`,
    name: IdpUsersData.users[index].name,
    roles: IdpUsersData.users[index].roles,
    groups: IdpUsersData.users[index].groups,
  }));

   // IdP 페이지 : IdP - Clients 페이지
   async function getIdpClientsList() {
    try {
      const response = await fetch(`${process.env.REACT_APP_MOCK_API}/idpkeycloak/clients`, {
        
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('IdP Clients List:', data);
      return data;
    } catch (error) {
      console.error('Error fetching data from /idp/keycloak/clients:', error);
      throw error;
         
    }
  }
  
  const IdpClientsData = await getIdpClientsList();
  
  export const _IdPClientsList = [...Array(IdpClientsData.clients.length)].map((_, index) => ({
    id: `${index}`,
    name: IdpClientsData.clients[index].name,
    rootUrl: IdpClientsData.clients[index].rootUrl,
    baseUrl: IdpClientsData.clients[index].baseUrl,
    protocol: IdpClientsData.clients[index].protocol,
  }));

  // IdP 페이지 : IdP - Roles 페이지
  async function getIdpRolesList() {
    try {
      const response = await fetch(`${process.env.REACT_APP_MOCK_API}/idpkeycloak/roles`, {
        
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('IdP Roles List:', data);
      return data;
    } catch (error) {
      console.error('Error fetching data from /idp/keycloak/roles:', error);
      throw error;
         
    }
  }
  
  const IdpRolesData = await getIdpRolesList();
  
  export const _IdPRolesList = [...Array(IdpRolesData.roles.length)].map((_, index) => ({
    id: `${index}`,
    name: IdpRolesData.roles[index].name,
    // isCustom: positionData[index].isCustom,
    type: IdpRolesData.roles[index].type,
    client: IdpRolesData.roles[index].client,
  }));


  export const IdP_OPTIONS = [
    { value: 'Groups', label: 'Groups' },
    { value: 'Users', label: 'Users' },
    { value: 'Clients', label: 'Clients'},
    { value: 'Roles', label: 'Roles' },
  ];