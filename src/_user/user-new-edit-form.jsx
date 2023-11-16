import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMemo, useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useDispatch } from 'react-redux';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

import { countries } from 'src/assets/data';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { INPUT_AWSACCOUNT } from 'src/redux/reducer/awsAccountSlice';
import { INPUT_CSP } from 'src/redux/reducer/cspSlice';
import { INPUT_DESCRIPTION } from 'src/redux/reducer/descriptionSlice';
import { INPUT_GCPACCOUNT } from 'src/redux/reducer/gcpAccountSlice';
import { INPUT_USERNAME } from 'src/redux/reducer/userNameSlice';
import { INPUT_ATTACHEDGROUP } from 'src/redux/reducer/attachedGroupSlice';
import { INPUT_DUTY } from 'src/redux/reducer/dutySlice';
import { INPUT_DEPARTMENT } from 'src/redux/reducer/departmentSlice';
import { ADD_ROWS } from 'src/redux/reducer/attachedPositionSlice';
// ----------------------------------------------------------------------

/**
 * 함수 설명
 * @param {Object} currentUser - 현재 사용자 정보 객체
 * @param {string} currentUser.id - 사용자 ID (문자열)
 * @param {string} currentUser.userName - 사용자 이름
 * @param {string} currentUser.description - 사용자 설명
 * @param {string} currentUser.awsAccount - AWS 계정 정보
 * @param {string} currentUser.gcpAccount - GCP 계정 정보
 * @param {List} currentUser.attachedPosition - 연결된 포지션 List
 * @param {List} currentUser.attachedGroup - 연결된 그룹 List
 * @param {string} currentUser.updatetime - 정보 업데이트 시간
 * @param {string} currentUser.csp - CSP 정보 (문자열)
 */
export default function UserNewEditForm({ currentUser }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    userName: Yup.string().required('User Name is required'),
    description: Yup.string().required('Description is required'),
    csp: Yup.string().required('Cloud is required'),
  });

  const defaultValues = useMemo(
    () => ({
      userName: currentUser?.userName || '',
      description: currentUser?.description || '',
      awsAccount: currentUser?.awsAccount || '',
      gcpAccount: currentUser?.gcpAccount || '',
      duty: currentUser?.duty || '',
      department: currentUser?.department || '',
      csp: currentUser?.csp || '',
    }),
    [currentUser]
  );

  // if (currentUser) {
  //   console.log('has currentUser', currentUser);
  //   dispatch(INPUT_DESCRIPTION(currentUser.description));
  //   dispatch(INPUT_USERNAME(currentUser.userName));
  //   dispatch(INPUT_CSP(currentUser.csp));
  //   dispatch(INPUT_AWSACCOUNT(currentUser.awsAccount));
  //   dispatch(INPUT_GCPACCOUNT(currentUser.gcpAccount));
  //   dispatch(INPUT_DUTY(currentUser.duty));
  //   dispatch(INPUT_DEPARTMENT(currentUser.department));
  // }
  useEffect(() => {
    if (currentUser) {
      console.log('has currentUser', currentUser);
      dispatch(INPUT_DESCRIPTION(currentUser.description ? currentUser.description : ''));
      dispatch(INPUT_USERNAME(currentUser.userName ? currentUser.userName : ''));
      dispatch(INPUT_CSP(currentUser.csp ? currentUser.csp : ''));
      dispatch(INPUT_AWSACCOUNT(currentUser.awsAccount ? currentUser.awsAccount : ''));
      dispatch(INPUT_GCPACCOUNT(currentUser.gcpAccount ? currentUser.gcpAccount : ''));
      dispatch(INPUT_DUTY(currentUser.duty ? currentUser.duty : ''));
      dispatch(INPUT_DEPARTMENT(currentUser.department ? currentUser.department : ''));
    }
  }, [currentUser, dispatch]);

  // else {
  //   console.log("hasn't currentUser");
  //   // dispatch(INPUT_DESCRIPTION('description'));
  //   // dispatch(INPUT_USERNAME('user name'));
  //   // dispatch(INPUT_CSP('csp'));
  //   // dispatch(INPUT_AWSACCOUNT('aws account'));
  //   // dispatch(INPUT_GCPACCOUNT('gcp account'));
  // }

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.user.list);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid xs={3}>
          <RHFTextField name="userName" label="User Name" />
        </Grid>
        <Grid xs={1}>
          <RHFAutocomplete
            name="csp"
            label="Cloud"
            options={['AWS', 'GCP', 'AWS, GCP']}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
          />
        </Grid>
        <Grid xs={4}>
          <RHFTextField name="awsAccount" label="AWS Account" />
        </Grid>
        <Grid xs={4}>
          <RHFTextField name="gcpAccount" label="GCP Account" />
        </Grid>
        <Grid xs={2}>
          <RHFTextField name="duty" label="Duty" />
        </Grid>
        <Grid xs={2}>
          <RHFTextField name="department" label="Department" />
        </Grid>
        <Grid xs={8}>
          <RHFTextField name="description" label="Description" />
        </Grid>
      </Grid>
    </FormProvider>
  );
}

UserNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};
