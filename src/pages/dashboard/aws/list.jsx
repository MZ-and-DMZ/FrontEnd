import { Helmet } from 'react-helmet-async';

import { AWSListView } from 'src/sections/AWS/view';

// ----------------------------------------------------------------------

export default function AWSListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Invoice List</title>
      </Helmet>

      <AWSListView />
    </>
  );
}
