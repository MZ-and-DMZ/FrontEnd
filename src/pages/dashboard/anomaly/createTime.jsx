import { Helmet } from 'react-helmet-async';

import { AnomalycreateTimeView } from 'src/sections/anomaly/view';

// ----------------------------------------------------------------------

export default function AnomalycreateTimePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new invoice</title>
      </Helmet>

      <AnomalycreateTimeView />
    </>
  );
}
