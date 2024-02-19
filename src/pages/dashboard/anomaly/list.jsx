import { Helmet } from 'react-helmet-async';

import { AnomalyListView } from 'src/sections/anomaly/view';

// ----------------------------------------------------------------------

export default function AnomalyListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Anomaly List</title>
      </Helmet>

      <AnomalyListView />
    </>
  );
}
