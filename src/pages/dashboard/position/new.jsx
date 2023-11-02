import { Helmet } from 'react-helmet-async';

// import PositionNewEditStepper from 'src/sections/position/view/position-new-edit-stepper';
import { PositionCreateView } from 'src/sections/position/view';
// import { UserCreateView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function PositionCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: 직무 생성</title>
      </Helmet>

      <PositionCreateView />

      {/* <PositionNewEditStepper /> */}
    </>
  );
}
