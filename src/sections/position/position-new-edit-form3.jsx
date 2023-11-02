import React, { useState, useMemo, useCallback } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
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

export default function PositionNewEditForm({ currentPosition, step }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  let validationSchema;
  let fieldsToRender;

  if (step === 0) {
    validationSchema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string().required('Email is required').email('Email must be a valid email address'),
      phoneNumber: Yup.string().required('Phone number is required'),
    });

    fieldsToRender = (
      <>
        <RHFTextField name="name" label="직무 이름" />
        <RHFTextField name="csp" label="CSP" />
        <RHFTextField name="position id" label="직무 ID" />
        <RHFTextField name="position description" label="직무 설명" />
      </>
    );
  } else if (step === 1) {
    validationSchema = Yup.object().shape({
      // address: Yup.string().required('Address is required'),
      // country: Yup.string().required('Country is required'),
      company: Yup.string().required('Company is required'),
      // state: Yup.string().required('State is required'),
      // city: Yup.string().required('City is required'),
      role: Yup.string().required('Role is required'),
      // zipCode: Yup.string().required('Zip code is required'),
      // avatarUrl: Yup.mixed().nullable().required('Avatar is required'),
      status: Yup.string(),
      isVerified: Yup.boolean(),
    });

    fieldsToRender = (
      <>
        <RHFAutocomplete
          name="country"
          label="Country"
          options={countries.map((country) => country.label)}
          getOptionLabel={(option) => option}
          isOptionEqualToValue={(option, value) => option === value}
          renderOption={(props, option) => {
            const { code, label, phone } = countries.find((country) => country.label === option);

            if (!label) {
              return null;
            }

            return (
              <li {...props} key={label}>
                <Iconify icon={`circle-flags:${code.toLowerCase()}`} width={28} sx={{ mr: 1 }} />
                {label} ({code}) +{phone}
              </li>
            );
          }}
        />
        <RHFTextField name="state" label="State/Region" />
        {/* <RHFTextField name="city" label="City" />
        <RHFTextField name="address" label="Address" />
        <RHFTextField name="zipCode" label="Zip/Code" /> */}
        <RHFTextField name="company" label="Company" />
        <RHFTextField name="role" label="Role" />
        {/* Add other fields as needed */}
      </>
    );
  }

  const NewPositionSchema = validationSchema;

  const defaultValues = useMemo(() => ({
    name: currentPosition?.name || '',
    city: currentPosition?.city || '',
    role: currentPosition?.role || '',
    email: currentPosition?.email || '',
    state: currentPosition?.state || '',
    status: currentPosition?.status || '',
    address: currentPosition?.address || '',
    country: currentPosition?.country || '',
    zipCode: currentPosition?.zipCode || '',
    company: currentPosition?.company || '',
    avatarUrl: currentPosition?.avatarUrl || null,
    phoneNumber: currentPosition?.phoneNumber || '',
    isVerified: currentPosition?.isVerified || true,
  }), [currentPosition]);

  const methods = useForm({
    resolver: yupResolver(NewPositionSchema),
    defaultValues,
  });

  const { reset, watch, control, setValue, handleSubmit, formState: { isSubmitting } } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentPosition ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.position.list);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    const newFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    if (file) {
      setValue('avatarUrl', newFile, { shouldValidate: true });
    }
  }, [setValue]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {/* ... */}
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              {fieldsToRender}
            </Box>
  
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentPosition ? 'Create Position' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  )};

  PositionNewEditForm.propTypes = {
    currentPosition: PropTypes.object,
    step: PropTypes.number.isRequired,
  };