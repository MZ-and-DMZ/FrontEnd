import { Helmet } from 'react-helmet-async';

// import PositionNewEditStepper from 'src/sections/position/view/position-new-edit-stepper';
import { RequestCreateView } from 'src/sections/request/view';
// import { UserCreateView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function RequestCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: 새로운 직무 요청</title>
      </Helmet>

      <RequestCreateView />

      {/* <PositionNewEditStepper /> */}
    </>
  );
}
