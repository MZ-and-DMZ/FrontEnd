import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { GroupEditView } from 'src/sections/group/view';

// ----------------------------------------------------------------------

export default function GroupEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Group Edit</title>
      </Helmet>

      <GroupEditView id={`${id}`} />
    </>
  );
}
