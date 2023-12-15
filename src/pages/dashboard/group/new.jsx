import { Helmet } from 'react-helmet-async';

import { GroupCreateView } from 'src/sections/group/view';

// ----------------------------------------------------------------------

export default function GroupCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new group</title>
      </Helmet>

      <GroupCreateView />
    </>
  );
}
