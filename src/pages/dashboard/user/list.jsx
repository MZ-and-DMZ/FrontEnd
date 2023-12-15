import { Helmet } from 'react-helmet-async';

// import { UserListView } from 'src/_user/view';
import { UserListView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: User List</title>
      </Helmet>

      <UserListView />
    </>
  );
}
