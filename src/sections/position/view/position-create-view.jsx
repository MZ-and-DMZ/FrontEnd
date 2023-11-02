import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { _positionList } from 'src/_mock';
import { useEffect, useState } from 'react';
import { Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import PositionNewEditFormInput from '../position-new-edit-form-input';
import PositionNewEditFormTree from '../position-new-edit-form-tree';
import PositionNewEditFormTable from '../position-new-edit-form-table';

// ----------------------------------------------------------------------

export default function PositionCreateView() {
  const settings = useSettingsContext();
  const [activeStep, setActiveStep] = useState(0);
  // const [currentPosition, setCurrentPosition] = useState(_positionList);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = ['CSP 선택 및 직무 기본 정보 기입', '기능별 정책 선택', '역할 및 권한 선택'];

  const [stepPage, setStepPage] = useState(<PositionNewEditFormInput />);
  useEffect(() => {
    switch (activeStep) {
      case 0:
        setStepPage(<PositionNewEditFormInput />);
        break;
      case 1:
        setStepPage(<PositionNewEditFormTable />);
        break;
      case 2:
        setStepPage(<PositionNewEditFormTree />);
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
