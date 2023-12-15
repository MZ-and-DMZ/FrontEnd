import * as Yup from 'yup';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { USER_CSP_OPTIONS } from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function UserQuickEditForm({ currentUser, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    awsAccount: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    gcpAccount: Yup.string()
      .required('Company is required')
      .email('Email must be a valid email address'),
    attachedPosition: Yup.string().required('City is required'),
    role: Yup.string().required('Role is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      awsAccount: currentUser?.awsAccount || '',
      gcpAccount: currentUser?.gcpAccount || '',
      csp: currentUser?.csp,
      attachedGroup: currentUser?.attachedGroup || '',
      attachedPosition: currentUser?.attachedPosition || '',
      company: currentUser?.company || '',
      role: currentUser?.role || '',
      updatetime: currentUser?.updatetime || '',
      duty: currentUser?.duty || '',
      department: currentUser?.department || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      onClose();
      enqueueSnackbar('Update success!');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>사용자 상세 정보</DialogTitle>

        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Account is waiting for confirmation
          </Alert>

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFSelect name="csp" label="CSP">
              {USER_CSP_OPTIONS.map((csp) => (
                <MenuItem key={csp.value} value={csp.value}>
                  {csp.label}
                </MenuItem>
              ))}
            </RHFSelect>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }} />

            <RHFTextField name="name" label="Full Name" />
            <RHFTextField name="gcpAccount" label="AWS 계정 정보" />
            <RHFTextField name="awsAccount" label="GCP 계정 정보" />
            <RHFTextField name="department" label="부서" />
            <RHFTextField name="duty" label="직책" />
            <RHFTextField name="description" label="설명" />
            <RHFTextField name="role" label="Role" />
            <RHFTextField name="attachedGroup" label="소속된 그룹" />
            <RHFTextField name="attachedPosition" label="부여된 직무" />
            <RHFTextField name="updatetime" label="최종 수정 시각" />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

UserQuickEditForm.propTypes = {
  currentUser: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
