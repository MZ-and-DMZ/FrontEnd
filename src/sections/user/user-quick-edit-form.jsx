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
import StarIcon from '@mui/icons-material/Star';

import { USER_CSP_OPTIONS, _userList } from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function UserQuickEditForm({ currentUser, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  // const [userDetail, setUserDetail] = useState(null);
  // const [selectedUserName, setSelectedUserName] = useState('');

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    awsAccount: Yup.string()
      .required('awsAccount is required'),
      // .email('Email must be a valid email address'),
    gcpAccount: Yup.string()
      .required('gcpAccount is required'),
      // .email('Email must be a valid email address'),
    attachedPosition: Yup.string().required('attached Postion is required'),
    role: Yup.string().required('Role is required'),
  });

  // useEffect(() => {
  //   const fetchUserDetail = async () => {
  //     try {
  //       if (selectedUserName) {
  //         const userDetailData = await _userDetailList(selectedUserName);
  //         setUserDetail(userDetailData);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user detail data:', error);
  //     }
  //   };
  //   fetchUserDetail();
  // }, [selectedUserName]);

  // Assuming currentUser includes userName field
  // useEffect(() => {
  //   if (currentUser) {
  //     setSelectedUserName(currentUser.userName);
  //   }
  // }, [currentUser]);

  // const defaultValues = useMemo(() => {
  //   const parsedAwsAccount = currentUser?.awsAccount ? {
  //     id: currentUser.awsAccount._id || '',
  //     attachedPolicies: (currentUser.awsAccount.AttachedPolicies || []).map(policy => ({
  //       policyName: policy.PolicyName || '',
  //       policyArn: policy.PolicyArn || ''
  //     })),
  //     createDate: currentUser.awsAccount.CreateDate?.$date || '',
  //     groups: currentUser.awsAccount.Groups || [],
  //     userName: currentUser.awsAccount.UserName || '',
  //     isMfaEnabled: currentUser.awsAccount.isMfaEnabled || false,
  //     managedKeys: (currentUser.awsAccount.managedKeys || []).map(key => ({
  //       keyId: key || '',
  //       createDate: '', // Modify this to your preferred value
  //       keyExpirationDate: '', // Modify this to your preferred value
  //     })),
  //     usedKeys: (currentUser.awsAccount.usedKeys || []).map(key => ({
  //       keyId: key || '',
  //       createDate: '', // Modify this to your preferred value
  //       keyExpirationDate: '', // Modify this to your preferred value
  //     })),
  //   } : null;
  
  //   return {
  //     fullName: currentUser?.fullName || '',
  //     awsAccount: parsedAwsAccount,
  //     gcpAccount: currentUser?.gcpAccount || '',
  //     csp: currentUser?.csp || '',
  //     attachedGroup: currentUser?.attachedGroup || '',
  //     attachedPosition: currentUser?.attachedPosition || '',
  //     company: currentUser?.company || '',
  //     description: currentUser?.description || '',
  //     // role: currentUser?.role || '',
  //     updatetime: currentUser?.updatetime || '',
  //     lastLoginTime: currentUser?.lastLoginTime || '',
  //     duty: currentUser?.duty || '',
  //     department: currentUser?.department || '',
  //     isMfaEnabled: currentUser?.isMfaEnabled || false,
  //     isImportantPerson: currentUser?.isImportantPerson || false,
  //     device: currentUser?.device || '',
  //     // usedAwsKeys: currentUser?.usedAwsKeys || '',
  //     // awsManagedKeys: currentUser?.awsManagedKeys || '',
  //     awsRole: currentUser?.awsRole || '',
  //     gcpRole: currentUser?.gcpRole || '',
  //     adGpo: currentUser?.adGpo || '',
  //     keyCloakRole: currentUser?.keyCloakRole || '',
  //   };
  // }, [currentUser]);

  const defaultValues = useMemo(
    () => ({
      fullName: currentUser?.fullName || '',
      awsName: currentUser?.awsName || '',
      // awsManagedKeys: (currentUser.awsAccount.managedKeys || []).map(key => ({
      //   keyId: key.keyId || '',
      //   createDate: key.createDate || '', // 여기에 createDate 추가
      //   expirationDate: key.expirationDate || '', // 여기에 expirationDate 추가
      // })),
      // awsUsedKeys: (currentUser.awsAccount.usedKeys || []).map(key => ({
      //   keyId: key.keyId || '',
      //   createDate: key.createDate || '', // 여기에 createDate 추가
      //   expirationDate: key.expirationDate || '', // 여기에 expirationDate 추가
      // })),
      awsUsedKeys: currentUser?.awsUsedKeys || '',
      awsManagedKeys: currentUser?.awsManagedKeys || '',
      // awsAccount: currentUser?.awsAccount ? {
      //   id: currentUser?.awsAccount._id || '',
      //   attachedPolicies: (currentUser.awsAccount.AttachedPolicies || []).map(policy => ({
      //     policyName: policy.PolicyName || '',
      //     policyArn: policy.PolicyArn || ''
      //   })),
      //   createDate: currentUser.awsAccount.CreateDate?.$date || '',
      //   groups: currentUser.awsAccount.Groups || [],
      //   userName: currentUser.awsAccount.UserName || '',
      //   isMfaEnabled: currentUser.awsAccount.isMfaEnabled || false,
      //   managedKeys: (currentUser.awsAccount.managedKeys || []).map(key => ({
      //     keyId: key || '',
      //   })),
      //   usedKeys: (currentUser.awsAccount.usedKeys || []).map(key => ({
      //     keyId: key || '',
      //   })),
      // } : null,
      gcpAccount: currentUser?.gcpAccount || '',
      csp: currentUser?.csp,
      attachedGroup: currentUser?.attachedGroup || '',
      attachedPosition: currentUser?.attachedPosition || '',
      company: currentUser?.company || '',
      description: currentUser?.description || '',
      // role: currentUser?.role || '',
      updatetime: currentUser?.updatetime || '',
      lastLoginTime: currentUser?.lastLoginTime || '',
      duty: currentUser?.duty || '',
      department: currentUser?.department || '',
      isMfaEnabled: currentUser?.isMfaEnabled || '',
      isImportantPerson: currentUser?.isImportantPerson || '',
      device: currentUser?.device || '',
      // usedAwsKeys: userDetail?.usedAwsKeys || '',
      // awsKeys: userDetail?.awsKeys || '',
      awsRole: currentUser?.awsRole || '',
      gcpRole: currentUser?.gcpRole || '',
      adGpo: currentUser?.adGpo || '',
      keyCloakRole: currentUser?.keyCloakRole || '',
    }),
    [currentUser]
  );
  
  // const defaultValues = useMemo(
  //   () => ({
  //     fullName: currentUser?.fullName || '',
  //     awsAccount: currentUser?.awsAccount ? {
  //       id: currentUser?.awsAccount._id || '',
  //       attachedPolicies: (currentUser.awsAccount.AttachedPolicies || []).map(policy => ({
  //         policyName: policy.PolicyName || '',
  //         policyArn: policy.PolicyArn || ''
  //       })),
  //       createDate: currentUser.awsAccount.CreateDate?.$date || '',
  //       groups: currentUser.awsAccount.Groups || [],
  //       userName: currentUser.awsAccount.UserName || '',
  //       isMfaEnabled: currentUser.awsAccount.isMfaEnabled || false,
  //       managedKeys: (currentUser.awsAccount.managedKeys || []).map(key => ({
  //         keyId: key || '',
  //       })),
  //       usedKeys: (currentUser.awsAccount.usedKeys || []).map(key => ({
  //         keyId: key || '',
  //       })),
  //     } : null,
  //     gcpAccount: currentUser?.gcpAccount || '',
  //     csp: currentUser?.csp,
  //     attachedGroup: currentUser?.attachedGroup || '',
  //     attachedPosition: currentUser?.attachedPosition || '',
  //     company: currentUser?.company || '',
  //     description: currentUser?.description || '',
  //     // role: currentUser?.role || '',
  //     updatetime: currentUser?.updatetime || '',
  //     lastLoginTime: currentUser?.lastLoginTime || '',
  //     duty: currentUser?.duty || '',
  //     department: currentUser?.department || '',
  //     isMfaEnabled: currentUser?.isMfaEnabled || '',
  //     isImportantPerson: currentUser?.isImportantPerson || '',
  //     device: currentUser?.device || '',
  //     // usedAwsKeys: userDetail?.usedAwsKeys || '',
  //     // awsKeys: userDetail?.awsKeys || '',
  //     awsRole: currentUser?.awsRole || '',
  //     gcpRole: currentUser?.gcpRole || '',
  //     adGpo: currentUser?.adGpo || '',
  //     keyCloakRole: currentUser?.keyCloakRole || '',
  //   }),
  //   [currentUser]
  // );

  // console.log(currentUser.fullName);


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

          {currentUser.isImportantPerson && ( // isImportantPerson이 true일 때만 표시
            <Alert
              variant="outlined"
              severity="warning"
              sx={{ mb: 3, display: 'flex', alignItems: 'center' }}
            >
            중요 계정입니다.
            </Alert>
          )}

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
            sx={{ padding: '10px' }}
          >
            <RHFTextField name="fullName" label="이름" />
            <RHFSelect name="csp" label="CSP" >
              {USER_CSP_OPTIONS.map((csp) => (
                <MenuItem key={csp.value} value={csp.value}>
                  {csp.label}
                </MenuItem>
              ))}
            </RHFSelect>
{/* <Box sx={{ display: { xs: 'none', sm: 'block' } }} /> */}
            
            <RHFTextField name="awsName" label="AWS 계정 정보" />
            <Box sx={{ padding: '10px' }}> </Box>
            <RHFTextField name="awsManagedKeys" label="AWS Managed Keys" />
            {/* <RHFTextField name="awsManagedKeysCreateDate" label="AWS Managed Keys 생성일" />
            <RHFTextField name="awsManagedKeysExpirationDate" label="AWS Managed Keys 만료일" /> */}
            <RHFTextField name="awsUsedKeys" label="AWS Used Keys" />
            {/* <RHFTextField name="awsUsedKeysCreateDate" label="AWS Used Keys 생성일" />
            <RHFTextField name="awsUsedKeysExpirationDate" label="AWS Used Keys 만료일" /> */}
            <RHFTextField name="gcpAccount" label="GCP 계정 정보" />
            <Box sx={{ padding: '10px' }}> </Box>
            <RHFTextField name="gcpManagedKeys" label="GCP Managed Keys"/>
            <RHFTextField name="gcpUsedKeys" label="GCP Used Keys" />    
            <RHFTextField name="department" label="부서" />
            <RHFTextField name="duty" label="직책" />
            <RHFTextField name="description" label="설명" />
            <RHFTextField name="awsRole" label="AWS 역할" />
            <RHFTextField name="gcpRole" label="GCP 역할" />
            <RHFTextField name="adGpo" label="AD 그룹 정책" />
            <RHFTextField name="keyCloakRole" label="KeyCloak 역할" />
            <RHFTextField name="attachedGroup" label="소속된 그룹" />
            <RHFTextField name="attachedPosition" label="부여된 직무" />
            <RHFTextField name="device" label="등록된 기기" />
            <RHFTextField name="lastLoginTime" label="최근 접속 시각" />
            <RHFTextField name="lastLoginIp" label="최근 접속 IP" />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            취소
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            수정
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
