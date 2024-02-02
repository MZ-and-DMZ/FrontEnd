import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { GCPDetailsView } from 'src/sections/GCP/view';

// ----------------------------------------------------------------------

export default function GCPDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Invoice Details</title>
      </Helmet>

      <GCPDetailsView id={`${id}`} />
    </>
  );
}
