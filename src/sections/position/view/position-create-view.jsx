import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import { Button, Step, StepLabel, Stepper, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { object } from 'prop-types';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { _positionList } from 'src/_mock';
import { SELECT_POSITION } from 'src/redux/reducer/position/list/positionSelectedSlice';
import { INIT_ROWS } from 'src/redux/reducer/user/create/attachedPositionSlice';

import { MailView } from 'src/sections/mail/view';
import PositionNewEditFormInput from '../position-new-edit-form-input';
// import PositionNewEditFormTree from '../position-new-edit-form-tree';
import PositionNewEditFormTable from '../position-new-edit-form-table';
import SecondCreateForm from '../position-new-edit-form-tree';

// ----------------------------------------------------------------------

export default function PositionCreateView() {
  const dispatch = useDispatch();

  // const currentPosition = useSelector((state) => state.positionSelectedRow);
  const settings = useSettingsContext();
  const [activeStep, setActiveStep] = useState(1);
  // const [currentPosition, setCurrentPosition] = useState(_positionList);
  // useEffect(() => {
  //   if (convertPosition) {
  //     setActiveStep(2);
  //   }
  //   console.log('convertPosition', convertPosition);
  // }, [convertPosition]);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    console.log('component open');
    return () => {
      console.log('component close');

      dispatch(SELECT_POSITION({})); // 초기화
      dispatch(INIT_ROWS([])); // 초기화
    }; // cleanup,
  }, [dispatch]);

  const steps = ['CSP 선택 및 직무 기본 정보 기입', '기능별 정책 선택', '역할 및 권한 선택'];

  const [stepPage, setStepPage] = useState(<PositionNewEditFormInput />);
  useEffect(() => {
    switch (activeStep) {
      case 0:
        setStepPage(<PositionNewEditFormInput />);
        break;
      case 1:
        setStepPage(<SecondCreateForm />);
        break;
      case 2:
        setStepPage(<PositionNewEditFormTable />);
        // setStepPage(<PositionNewEditFormTable currentPosition={currentPosition} />);
        break;
      default:
        setStepPage(<PositionNewEditFormInput />);
    }
  }, [activeStep]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new position"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'User',
            href: paths.dashboard.user.root,
          },
          { name: 'New user' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {/* <Box sx={{ width: '100%' }}> */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <div>
          <Typography sx={{ mt: 2, mb: 1 }}>새로운 직무가 생성되었습니다.</Typography>
        </div>
      ) : (
        <>
          {stepPage}
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </>
      )}
      {/* </Box> */}
    </Container>
  );
}

// PositionCreateView.propTypes = {
//   convertPosition: object,
// };
