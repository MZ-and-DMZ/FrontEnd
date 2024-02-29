import { Helmet } from 'react-helmet-async';

import { AWSCreateView } from 'src/sections/AWS/view';

// ----------------------------------------------------------------------

export default function AWSCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new invoice</title>
      </Helmet>

      <AWSCreateView />
    </>
  );
}
