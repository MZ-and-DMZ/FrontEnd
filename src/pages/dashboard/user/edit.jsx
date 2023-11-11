import { Helmet } from 'react-helmet-async';
import { UserEditView } from 'src/_user/view';

import { useParams } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: User Edit</title>
      </Helmet>

      <UserEditView id={`${id}`} />
      {console.log('in page', id)}
    </>
  );
}
