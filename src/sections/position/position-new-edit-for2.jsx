import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


// import { currentPosition } from './position-new-edit-form3';
import PositionNewEditForm from './position-new-edit-form3';



function PositionCreateStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    fetch('http://54.180.76.116:8080/boch/create/position').then(response => response.json()).then(data => setCurrentPosition(data));
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = ['CSP 선택 및 직무 기본 정보 기입', '기능별 정책 선택', '역할 및 권한 선택']; 

  return (
    <Box sx={{ width: '100%' }}>
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
            <PositionNewEditForm
              currentPosition={currentPosition}
              step={activeStep}
            />
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </>
        )}
    </Box>
  );
}

export default PositionCreateStepper;
