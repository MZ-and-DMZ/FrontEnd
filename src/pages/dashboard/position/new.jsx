import { Helmet } from 'react-helmet-async';

import PositionNewEditForm from 'src/sections/position/position-new-edit-stepper';
import { PositionCreateStepper } from 'src/sections/position/view';
// import { UserCreateView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function PositionCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: 직무 생성</title>
      </Helmet>

      <PositionCreateStepper />

      <PositionNewEditForm />
    </>
  );
}
