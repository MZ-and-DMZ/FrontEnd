import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMemo, useCallback } from 'react';
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
import {
  INPUT_AWSACCOUNT,
  INPUT_CSP,
  INPUT_DESCRIPTION,
  INPUT_GCPCACCOUNT,
  INPUT_USERNAME,
} from 'src/redux/reducer/positionSelectedSlice';

// ----------------------------------------------------------------------

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
    }),
    [currentUser]
  );

  // if (currentUser) {
  //   dispatch(INPUT_DESCRIPTION(currentUser.description));
  //   dispatch(INPUT_USERNAME(currentUser.userName));
  //   dispatch(INPUT_CSP(currentUser.csp));
  //   dispatch(INPUT_AWSACCOUNT(currentUser.awsEmail));
  //   dispatch(INPUT_GCPCACCOUNT(currentUser.gcpEmail));
  // } else {
  //   dispatch(INPUT_DESCRIPTION(''));
  //   dispatch(INPUT_USERNAME(''));
  //   dispatch(INPUT_CSP(''));
  //   dispatch(INPUT_AWSACCOUNT(''));
  //   dispatch(INPUT_GCPCACCOUNT(''));
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
        <Grid item xs={3}>
          <RHFTextField name="userName" label="User Name" />
        </Grid>
        <Grid item xs={1}>
          <RHFAutocomplete
            name="csp"
            label="Cloud"
            options={['AWS', 'GCP', 'AWS, GCP']}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField name="awsAccount" label="AWS Account" />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField name="gcpAccount" label="GCP Account" />
        </Grid>
        <Grid item xs={2}>
          <RHFTextField name="duty" label="Duty" />
        </Grid>
        <Grid item xs={2}>
          <RHFTextField name="department" label="Department" />
        </Grid>
        <Grid item xs={8}>
          <RHFTextField name="description" label="Description" />
        </Grid>
      </Grid>

      {/* <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {!currentUser ? 'Create User' : 'Save Changes'}
        </LoadingButton>
      </Stack> */}
      {/* </Card> */}
    </FormProvider>
  );
}

UserNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};
