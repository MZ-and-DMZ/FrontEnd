import { Helmet } from 'react-helmet-async';

import { GCPCreateView } from 'src/sections/GCP/view';

// ----------------------------------------------------------------------

export default function GCPCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new invoice</title>
      </Helmet>

      <GCPCreateView />
    </>
  );
}
