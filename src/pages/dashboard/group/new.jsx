import { Helmet } from 'react-helmet-async';

import { GroupCreateView } from 'src/sections/group/view';

// ----------------------------------------------------------------------

export default function UserCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new user</title>
      </Helmet>

      <GroupCreateView />
    </>
  );
}
