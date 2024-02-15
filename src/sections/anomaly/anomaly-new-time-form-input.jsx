import React, { useMemo, useState, useEffect } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Card, Grid, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import MenuItem from '@mui/material/MenuItem';
// import { TimePicker } from '@mui/lab/TimePicker';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useDispatch } from 'react-redux';

import { createAnomalyTime, POSITION_CSP_OPTIONS } from 'src/_mock';

// import { UserCreateView } from 'src/sections/user/view/user-create-view';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFSelect, RHFAutocomplete } from 'src/components/hook-form';
import { INPUT_STARTTIME } from 'src/redux/reducer/anomaly/create/timeStartTimeSlice';
import { INPUT_ENDTIME } from 'src/redux/reducer/anomaly/create/timeEndTimeSlice';
import { INPUT_GROUP } from 'src/redux/reducer/anomaly/create/timeGroupSlice';

export default function AnomalyNewTimeForm({ currentTime }) {
  // const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();
  // const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  // const validationSchema = Yup.object().shape({
  //   company: Yup.string().required('Company is required'),
  //   role: Yup.string().required('Role is required'),
  //   status: Yup.string(),
  //   isVerified: Yup.boolean(),
  // });

  const NewTimeSchema = Yup.object().shape({
    groupName: Yup.string().required('group is required'),
    startTime: Yup.string().required('startTime is required'),
    endTime: Yup.string().required('endTime is required'),
  });

  const defaultValues = useMemo(
    () => ({
      groupName: currentTime?.groupName || '',
      startTime: currentTime?.startTime || '',
      endTime: currentTime?.endTime || '',
    }),
    [currentTime]
  );

  useEffect(() => {
    if (currentTime) {
      console.log('has currentUser', currentTime);
      dispatch(INPUT_GROUP(currentTime.groupName ? currentTime.groupName : ''));
      dispatch(INPUT_STARTTIME(currentTime.startTime ? currentTime.startTime : ''));
      dispatch(INPUT_ENDTIME(currentTime.endTime ? currentTime.endTime : ''));
    }
  }, [currentTime, dispatch]);

  const methods = useForm({
    resolver: yupResolver(NewTimeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const values = watch();

  // const {
  //   reset,
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = methods;

  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     reset();
  //     enqueueSnackbar(currentPosition ? 'Update success!' : 'Create success!');
  //     router.push(paths.dashboard.position.list);
  //     console.info('DATA', data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });
  // const handleChange = (e) => {
  //   console.log(e.target.name);
  //   console.log('Input value:', e.target.value);
  // };

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("hello");
      // const responseData = await createAnomalyTime(data);
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // enqueueSnackbar(currentTime ? 'Update success!' : 'Create success!');
      // router.push(paths.dashboard.anomaly.list); // 여기 수정하면 될듯
      // console.info('DATA', data);
    } catch (error) {
      console.error(error);
    } finally {
      // setIsLoading(false);
    }
  });



  // const handleDrop = useCallback((acceptedFiles) => {
  //   const file = acceptedFiles[0];

  //   const newFile = Object.assign(file, {
  //     preview: URL.createObjectURL(file),
  //   });

  //   if (file) {
  //     setValue('avatarUrl', newFile, { shouldValidate: true });
  //   }
  // }, [setValue]);

  return (
    <FormProvider methods={methods}>
      {/* <form onSubmit={methods.handleSubmit(onSubmit)}> */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Grid container spacing={2}>
              <Grid item xs={12}>
            {/* 그룹 이름을 입력받는 TextField */}
            <RHFTextField name="groupName" label="Group Name" fullWidth required/>
          </Grid>
                <Grid item xs={12} md={6}>
                  {/* 시작 시간을 입력받는 TextField */}
                  <RHFTextField
                    label="Start Time"
                    name="startTime"
                    type="time"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // inputProps={{
                    //   step: 300, // 시간 간격을 5분 단위로 설정
                    // }}
                    // required // 필수 입력 필드로 설정
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {/* 종료 시간을 입력받는 TextField */}
                  <RHFTextField
                    label="End Time"
                    name="endTime"
                    type="time"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // inputProps={{
                    //   step: 300, // 시간 간격을 5분 단위로 설정
                    // }}
                    // required // 필수 입력 필드로 설정
                    // onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid >
          {/* <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}> */}
                  {/* 폼 제출 버튼 */}
                  {/* <Button type="submit" variant="contained">
                    Submit
                  </Button> */}
                {/* </Grid> */}
        </Grid>
      {/* </form> */}
    </FormProvider>
    // <FormProvider methods={methods} onSubmit={onSubmit}>
    //   <Grid container spacing={3}>
    //     {/* ... */}
    //     {/* <Grid xs={12} md={8}> */}
    //     <Grid xs={12}>
    //       <Card sx={{ p: 3 }}>
    //         <Grid container spacing={2}>
    //           <Grid xs={12}>
    //             <RHFTextField name="time" label="Time" />
    //           </Grid>
    //         </Grid>
    //       </Card>
    //     </Grid>
    //   </Grid>
    // </FormProvider>
  );
}

AnomalyNewTimeForm.propTypes = {
  currentTime: PropTypes.object,
};
