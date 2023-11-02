import { Helmet } from 'react-helmet-async';

import { PositionListView } from 'src/sections/position/view';

// ----------------------------------------------------------------------

export default function PositionListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Position List</title>
      </Helmet>

      <PositionListView />
    </>
  );
}
