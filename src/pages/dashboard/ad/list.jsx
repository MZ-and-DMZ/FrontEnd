import { Helmet } from 'react-helmet-async';

import { WindowADListView } from 'src/sections/windowAD/view';

// ----------------------------------------------------------------------

export default function WindowADListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: windowAD List</title>
      </Helmet>

      <WindowADListView/>
    </>
  );
}
