import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import GroupUserListView from 'src/sections/group/view/group-user-list-view';

// ----------------------------------------------------------------------

export default function GroupUserListPage() {

  const params = useParams();

  const { departmentName } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: 부서별 사용자 리스트</title>
      </Helmet>

      <GroupUserListView id={`${departmentName}`}/>
    </>
  );
}