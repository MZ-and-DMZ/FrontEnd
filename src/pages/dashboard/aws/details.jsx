import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { AWSDetailsView } from 'src/sections/AWS/view';

// ----------------------------------------------------------------------

export default function AWSDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Invoice Details</title>
      </Helmet>

      <AWSDetailsView id={`${id}`} />
    </>
  );
}
