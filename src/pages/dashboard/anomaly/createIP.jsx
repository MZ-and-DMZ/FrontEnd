import { Helmet } from 'react-helmet-async';

import { AnomalycreateIPView } from 'src/sections/anomaly/view';

// ----------------------------------------------------------------------

export default function AnomalycreateIPPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new IP</title>
      </Helmet>

      <AnomalycreateIPView />
    </>
  );
}
