import { Helmet } from 'react-helmet-async';

import { GCPListView } from 'src/sections/GCP/view';

// ----------------------------------------------------------------------

export default function GCPListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Invoice List</title>
      </Helmet>

      <GCPListView />
    </>
  );
}
