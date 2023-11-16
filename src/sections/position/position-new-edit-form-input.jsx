import React, { useMemo, useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import MenuItem from '@mui/material/MenuItem';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { createPosition, POSITION_CSP_OPTIONS } from 'src/_mock';

import UserCreateView from 'src/_user/view/user-create-view';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';

export default function PositionNewEditForm({ currentPosition }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = Yup.object().shape({
    company: Yup.string().required('Company is required'),
    role: Yup.string().required('Role is required'),
    status: Yup.string(),
    isVerified: Yup.boolean(),
  });

  const NewPositionSchema = validationSchema;

  const defaultValues = useMemo(
    () => ({
      name: currentPosition?.name || '',
      role: currentPosition?.role || '',
      email: currentPosition?.email || '',
      state: currentPosition?.state || '',
      status: currentPosition?.status || '',
      company: currentPosition?.company || '',
      isVerified: currentPosition?.isVerified || true,
    }),
    [currentPosition]
  );

  const methods = useForm({
    resolver: yupResolver(NewPositionSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

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

  const onSubmit = handleSubmit(async (data) => {
    try {
      const responseData = await createPosition(data);

      reset();
      enqueueSnackbar(currentPosition ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.position.list);
      console.info('DATA', responseData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {/* ... */}
        {/* <Grid xs={12} md={8}> */}
        <Grid xs={12}>
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
              <RHFTextField name="name" label="직무 이름" />
              <RHFSelect name="csp" label="CSP">
                {POSITION_CSP_OPTIONS.map((csp) => (
                  <MenuItem key={csp.value} value={csp.value}>
                    {csp.label}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFTextField name="position id" label="직무 ID" />
              <RHFTextField name="position description" label="직무 설명" />
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
  );
}

PositionNewEditForm.propTypes = {
  currentPosition: PropTypes.object,
};
