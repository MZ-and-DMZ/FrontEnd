import { Helmet } from 'react-helmet-async';

import { IDPListView } from 'src/sections/IdP/view';

// ----------------------------------------------------------------------

export default function IdPListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: IdP List</title>
      </Helmet>

      <IDPListView />
    </>
  );
}
