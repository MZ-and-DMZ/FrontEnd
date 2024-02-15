import React, { useMemo, useState, useEffect } from 'react';
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
import { useDispatch } from 'react-redux';

import { createPosition, POSITION_CSP_OPTIONS } from 'src/_mock';

// import { UserCreateView } from 'src/sections/user/view/user-create-view';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFSelect, RHFAutocomplete } from 'src/components/hook-form';
import { INPUT_IP } from 'src/redux/reducer/anomaly/create/ipSlice';

export default function AnomalyNewIPForm({ currentIP }) {
  const dispatch = useDispatch();
  const NewIPSchema = Yup.object().shape({
    ipAddress: Yup.string().required('ipAddress is required'),
  });

  const defaultValues = useMemo(
    () => ({
      ipAddress: currentIP?.ipAddress || '',
    }),
    [currentIP]
  );


  useEffect(() => {
    if (currentIP) {
      console.log('has currentUser', currentIP);
      dispatch(INPUT_IP(currentIP.ipAddress ? currentIP.ipAddress : ''));
    }
  }, [currentIP, dispatch]);

  const methods = useForm({
    resolver: yupResolver(NewIPSchema),
    defaultValues,
  });

  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <FormProvider methods={methods}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* IP를 입력받는 TextField */}
                <RHFTextField name="ip" label="IP Address" fullWidth required />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

AnomalyNewIPForm.propTypes = {
  currentIP: PropTypes.object,
};
