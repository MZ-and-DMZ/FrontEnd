import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { object } from 'prop-types';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { createAnomalyTime, _positionList } from 'src/_mock';
import { Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { SELECT_POSITION } from 'src/redux/reducer/position/list/positionSelectedSlice';
import FormProvider, { RHFTextField, RHFSelect, RHFAutocomplete } from 'src/components/hook-form';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { SendTimeButton } from '../send-time-button';

// import { MailView } from 'src/sections/mail/view';
import AWSNewAnomalyNewTimeForm from '../anomaly-new-time-form-input';
// import PositionNewEditFormTree from '../position-new-edit-form-tree';
// import PositionNewEditFormTable from '../aws-new-edit-form-table';
// import SecondCreateForm from '../aws-new-edit-form-tree';

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

export default function AnomalycreateTimeView() {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="새로운 시간대 등록"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'anomaly',
            href: paths.dashboard.anomaly.root,
          },
          { name: 'vew time' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
        <AWSNewAnomalyNewTimeForm/>
        <div style={{ textAlign: 'right' }}>
          <SendTimeButton />
        </div>
    </Container>
  );

}

// export default function AnomalycreateTimeView() {
//   const settings = useSettingsContext();
//   const methods = useForm();
//   // const dispatch = useDispatch();
//   // const [activeStep, setActiveStep] = useState(0);

//   // useEffect(() => {
//   //   console.log('component open');
//   //   return () => {
//   //     console.log('component close');

//   //     dispatch(SELECT_POSITION({})); // 초기화
//   //     // dispatch(INIT_ROWS([])); // 초기화
//   //   }; // cleanup,
//   // }, [dispatch]);

//   const [timeData, setTimeData] = useState({
//     group: '',
//     startTime: '',
//     endTime: '',
//   });
//   const group = useSelector((state) => state.group);
//   const startTime = useSelector((state) => state.startTime);
//   const endTime = useSelector((state) => state.endTime);

//   useEffect(() => {
//     console.log('component open');
//     setTimeData(() => ({
//       group,
//       startTime,
//       endTime,
//     }));
//   }, [group, startTime, endTime]);

//   console.log('TimeData', timeData);

//   const onSubmit = (data) => {
    
//     console.log(data);
//     // 입력값을 post로 전달하고, 이전 페이지로 돌아가기 ?
//     // createAnomalyTime(timeData);
//     // setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   // const onSubmit = handleSubmit(async (data) => {
//   //   try {
//   //     console.log("hello");
//   //     // const responseData = await createPosition(data);

//   //     // reset();
//   //     // enqueueSnackbar(currentPosition ? 'Update success!' : 'Create success!');
//   //     // router.push(paths.dashboard.anomaly.list); // 여기 수정하면 될듯
//   //     // console.info('DATA', data);
//   //   } catch (error) {
//   //     console.error(error);
//   //   } finally {
//   //     // setIsLoading(false);
//   //   }
//   // });

//   // const steps = ['허용할 시간대 입력'];

//   // const [stepPage, setStepPage] = useState(<AWSNewAnomalyNewTimeForm />);
//   // useEffect(() => {
//   //   switch (activeStep) {
//   //     case 0:
//   //       setStepPage(<AWSNewAnomalyNewTimeForm />);
//   //       break;
//   //     default:
//   //       setStepPage(<AWSNewAnomalyNewTimeForm />);
//   //   }
//   // }, [activeStep]);

//   return (
//     <Container maxWidth={settings.themeStretch ? false : 'lg'}>
//       <CustomBreadcrumbs
//         heading="새로운 시간대 등록"
//         links={[
//           {
//             name: 'Dashboard',
//             href: paths.dashboard.root,
//           },
//           {
//             name: 'anomaly',
//             href: paths.dashboard.anomaly.root,
//           },
//           { name: 'vew time' },
//         ]}
//         sx={{
//           mb: { xs: 3, md: 5 },
//         }}
//       />

//       {/* <AWSNewAnomalyNewTimeForm/> */}

//       {/* <div style={{ textAlign: 'right' }}>
//         <Button variant="contained" onClick={handleNext}
//         // href={paths.dashboard.anomaly.list}
//         >
//           Finish
//         </Button>
//       </div> */}

//       {/* </Box> */}

//       {/* <Stepper activeStep={activeStep} alternativeLabel>
//         {steps.map((label, index) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       {activeStep === steps.length ? (
//         <div>
//           <Typography sx={{ mt: 2, mb: 1 }}>새로운 직무가 생성되었습니다.</Typography>
//         </div>
//       ) : (
//         <>
//           {stepPage}
//           <Button variant="contained" onClick={handleNext}>
//             {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//           </Button>
//         </>
//       )} */}


//       {/* <Stepper activeStep={activeStep} alternativeLabel>
//       {steps.map((label, index) => (
//         <Step key={label}>
//           <StepLabel>{label}</StepLabel>
//         </Step>
//       ))}
//     </Stepper>
//     {activeStep === steps.length ? (
//         <Button 
//         component={RouterLink}
//         href={paths.dashboard.position.list}
//         variant="contained"
//         color = "primary"
//         >
//           닫기
//         </Button>
//     ) : (
//       <>
//         {stepPage}
//         <Button
//           color = "primary"
//           variant="contained"
//           onClick={() => {
//             handleNext();
//             if (activeStep === steps.length - 1) {
//               createAnomalyTime(timeData);
//               // createPosition(positionData);
//               // setModalOpen(true);
//             }
//           }}
//         >
//           {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//         </Button>
//         </>
//       )} */}
// </FormProvider>
//     </Container>
//   );
// }


// export default function AnomalycreateTimeView() {
//   // const currentPosition = useSelector((state) => state.positionSelectedRow);
//   const settings = useSettingsContext();
//   const [activeStep, setActiveStep] = useState(0);
//   // const [currentPosition, setCurrentPosition] = useState(_positionList);
//   // useEffect(() => {
//   //   if (convertPosition) {
//   //     setActiveStep(2);
//   //   }
//   //   console.log('convertPosition', convertPosition);
//   // }, [convertPosition]);
//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const steps = ['허용할 시간대 입력'];

//   const [stepPage, setStepPage] = useState(<AWSNewAnomalyNewTimeForm />);
//   useEffect(() => {
//     switch (activeStep) {
//       case 0:
//         setStepPage(<AWSNewAnomalyNewTimeForm />);
//         break;
//       case 1:
//         setStepPage(<SecondCreateForm />);
//         break;
//       case 2:
//         setStepPage(<PositionNewEditFormTable />);
//         // setStepPage(<PositionNewEditFormTable currentPosition={currentPosition} />);
//         break;
//       default:
//         setStepPage(<AWSNewAnomalyNewTimeFormEditForm />);
//     }
//   }, [activeStep]);

//   return (
//     <Container maxWidth={settings.themeStretch ? false : 'lg'}>
//       <CustomBreadcrumbs
//         heading="새로운 시간대 등록"
//         links={[
//           {
//             name: 'Dashboard',
//             href: paths.dashboard.root,
//           },
//           {
//             name: 'anomaly',
//             href: paths.dashboard.anomaly.root,
//           },
//           { name: 'vew time' },
//         ]}
//         sx={{
//           mb: { xs: 3, md: 5 },
//         }}
//       />

//       {/* <Box sx={{ width: '100%' }}> */}
//       <Stepper activeStep={activeStep} alternativeLabel>
//         {steps.map((label, index) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       {activeStep === steps.length ? (
//         <div>
//           <Typography sx={{ mt: 2, mb: 1 }}>새로운 직무가 생성되었습니다.</Typography>
//         </div>
//       ) : (
//         <>
//           {stepPage}
//           {/* <Button disabled={activeStep === 0} onClick={handleBack}>
//             Back
//           </Button> */}
//           <Button variant="contained" onClick={handleNext}>
//             {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//           </Button>
//         </>
//       )}
//       {/* </Box> */}
//     </Container>
//   );
// }

// PositionCreateView.propTypes = {
//   convertPosition: object,
// };
