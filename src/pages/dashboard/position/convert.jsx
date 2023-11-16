import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { PositionEditView } from 'src/sections/position/view';

// ----------------------------------------------------------------------

export default function PositionEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Position Edit</title>
      </Helmet>

      <PositionEditView id={`${id}`} />
    </>
  );
}
