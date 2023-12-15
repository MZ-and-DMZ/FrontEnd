import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Step, StepLabel, Stepper, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { object } from 'prop-types';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { _positionList, createPosition } from 'src/_mock';
import { SELECT_POSITION } from 'src/redux/reducer/position/list/positionSelectedSlice';
import { INIT_ROWS } from 'src/redux/reducer/user/create/attachedPositionSlice';
import { RouterLink } from 'src/routes/components';

import { MailView } from 'src/sections/mail/view';
import PositionNewEditFormInput from '../position-new-edit-form-input';
// import PositionNewEditFormTree from '../position-new-edit-form-tree';
import PositionNewEditFormTable from '../position-new-edit-form-table';
import SecondCreateForm from '../position-new-edit-form-tree';

// ----------------------------------------------------------------------

export default function PositionCreateView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  // const currentPosition = useSelector((state) => state.positionSelectedRow);
  const settings = useSettingsContext();
  const [activeStep, setActiveStep] = useState(0);
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

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    console.log('component open');
    return () => {
      console.log('component close');

      dispatch(SELECT_POSITION({})); // 초기화
      dispatch(INIT_ROWS([])); // 초기화
    }; // cleanup,
  }, [dispatch]);

  const [positionData, setPositionData] = useState({
    positionName: '',
    description: '',
    csp: '',
    policies: [],
  });
  const userName = useSelector((state) => state.userName);
  const description = useSelector((state) => state.description);
  const csp = useSelector((state) => state.csp);
  const attachedPolicies = useSelector((state) => state.attachedPosition);

  useEffect(() => {
    setPositionData((prevData) => ({
      ...prevData,
      positionName: userName,
      description,
      csp,
      policies: attachedPolicies.map((policy) => {
        if (policy.csp === 'aws') {
          return policy.name;
        }
        if (policy.csp === 'gcp') {
          return policy.name;
        }
        return '';
      }),
    }));
  }, [userName, description, csp, attachedPolicies]);

  console.log('positionData', positionData);

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

<Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    {activeStep === steps.length ? (
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
      <DialogTitle sx={{ fontSize: 18 }}>
        알림
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ mt: 2, mb: 1 }}>
          새로운 직무가 생성되었습니다.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button 
        component={RouterLink}
        href={paths.dashboard.position.list}
        variant="contained"
        color = "primary"
        >
          닫기
        </Button>
      </DialogActions>
    </Dialog>
    ) : (
      <>
        {stepPage}
          <Button disabled={activeStep === 0} onClick={handleBack} color = "primary">
          Back
        </Button>
        <Button
          color = "primary"
          variant="contained"
          onClick={() => {
            handleNext();
            if (activeStep === steps.length - 1) {
              createPosition(positionData);
              setModalOpen(true);
            }
          }}
        >
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
