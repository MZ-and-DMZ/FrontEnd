import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { object } from 'prop-types';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { _positionList } from 'src/_mock';
import { Button, Step, StepLabel, Stepper, Typography } from '@mui/material';

import { MailView } from 'src/sections/mail/view';
import PositionNewEditFormInput from '../aws-new-edit-form-input';
// import PositionNewEditFormTree from '../position-new-edit-form-tree';
import PositionNewEditFormTable from '../aws-new-edit-form-table';
import SecondCreateForm from '../aws-new-edit-form-tree';

// ----------------------------------------------------------------------

// 패치한 점.
// 1. 일단 파일명이랑 변수명 같게 해서 헷갈리지 않게 했음.
// 2. position-new-edit-form.jsx 들을 3개로 나눴음. ~~input, ~~table, ~~tree
// 3. 갖가지 에러들 다 없앰. (빨간줄 다 없앰)
// 4. ~~input 페이지에서 grid가 full width가 되게끔 함. 그거 <Grid xs={12} md={8}> 에서 md={8}을 없애면 됨.
//    xs={12}라 되어있는건 12가 최대값임. 13으로 넘어가면 안됨. grid가 12개로 나눠져있기 때문임.
//    따라서 최대 12 Grid로 나눌 수 있음.

// 결론. 한번 position-new-edit-form ~~ 들은 다 들어가서 확인해보면 금방 끝남.
// 1. position-new-edit-form-input.jsx 에서는 input 관련된 것만 다룸.
//    근데 코드에 필요없는 부분이 뭔지 모르겠음. 나중에 삭제해주셈.
// 2. position-new-edit-form-tree.jsx 에서는 tree 관련된 것만 다룸.
// 3. position-new-edit-form-table.jsx 에서는 table 관련된 것만 다룸.
// 4. user-new-edit-form.jsx, user-table-toolbar.jsx, data_grid_import.jsx, data_grid_view.jsx 등등
//    position으로 시작하지 않는 것들은 나중에 table 관련된 것으로 바꿀 예정임. 지우지 말아주셈.

/**
 *
 * @param {object} currentPosition
 * @param {String} currentPosition.id
 * @param {String} currentPosition.positionName
 * @param {String} currentPosition.description
 * @param {String} currentPosition.csp
 * @param {Array} convertPosition.policies - List of Policy Name
 * @returns
 */

export default function PositionCreateView() {
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
