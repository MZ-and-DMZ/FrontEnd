import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { GroupEditView, GroupListView } from 'src/sections/group/view';

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: User Edit</title>
      </Helmet>

      <GroupEditView id={`${id}`} />
    </>
  );
}
