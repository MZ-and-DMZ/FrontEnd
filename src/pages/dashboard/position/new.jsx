import { Helmet } from 'react-helmet-async';
import PositionNewEditForm from 'src/sections/position/position-new-edit-for2';
import { PositionCreateStepper } from 'src/sections/position/view';
// import { UserCreateView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function PositionCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new position</title>
      </Helmet>

      <PositionCreateStepper />

      <PositionNewEditForm />
    </>
  );
}
