import { Helmet } from 'react-helmet-async';

import { RequestListView } from 'src/sections/request/view';

// ----------------------------------------------------------------------

export default function DepartmentUserPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: 요청 리스트</title>
      </Helmet>

      <RequestListView />
    </>
  );
}