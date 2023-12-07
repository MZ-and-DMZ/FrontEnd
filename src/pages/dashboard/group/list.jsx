import { Helmet } from 'react-helmet-async';

import { GroupListView } from 'src/sections/group/view';

// ----------------------------------------------------------------------

export default function UserListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: User List</title>
      </Helmet>

      <GroupListView />
    </>
  );
}
