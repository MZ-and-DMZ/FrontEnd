import * as Yup from 'yup'; // Yup 유효성 검사 라이브러리를 전체로 가져옵니다.
import { useState } from 'react'; // React의 useState 훅을 가져옵니다.
import { useForm } from 'react-hook-form'; // React Hook Form 관련 함수를 가져옵니다.
import { yupResolver } from '@hookform/resolvers/yup'; // Yup 스키마를 사용하기 위한 resolver를 가져옵니다.

import Link from '@mui/material/Link'; // Material-UI의 Link 컴포넌트를 가져옵니다.
import Alert from '@mui/material/Alert'; // Material-UI의 Alert 컴포넌트를 가져옵니다.
import Stack from '@mui/material/Stack'; // Material-UI의 Stack 컴포넌트를 가져옵니다.
import IconButton from '@mui/material/IconButton'; // Material-UI의 IconButton 컴포넌트를 가져옵니다.
import Typography from '@mui/material/Typography'; // Material-UI의 Typography 컴포넌트를 가져옵니다.
import LoadingButton from '@mui/lab/LoadingButton'; // Material-UI의 LoadingButton 컴포넌트를 가져옵니다.
import InputAdornment from '@mui/material/InputAdornment'; // Material-UI의 InputAdornment 컴포넌트를 가져옵니다.

import { paths } from 'src/routes/paths'; // 경로 관련 정보를 가져옵니다.
import { RouterLink } from 'src/routes/components'; // 경로 관련 컴포넌트를 가져옵니다.
import { useRouter, useSearchParams } from 'src/routes/hooks'; // 라우터 관련 훅을 가져옵니다.

import { useBoolean } from 'src/hooks/use-boolean'; // useBoolean 커스텀 훅을 가져옵니다.

import { useAuthContext } from 'src/auth/hooks'; // 인증 관련 컨텍스트 훅을 가져옵니다.
import { PATH_AFTER_LOGIN } from 'src/config-global'; // 로그인 후 이동할 경로를 가져옵니다.

import Iconify from 'src/components/iconify'; // 아이콘 컴포넌트를 가져옵니다.
import FormProvider, { RHFTextField } from 'src/components/hook-form'; // 폼 관련 컴포넌트를 가져옵니다.

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext(); // 인증 관련 컨텍스트에서 login 함수를 가져옵니다.

  const router = useRouter(); // 라우터 훅을 사용하여 라우터 정보를 가져옵니다.

  const [errorMsg, setErrorMsg] = useState(''); // 오류 메시지 상태를 관리합니다.

  const searchParams = useSearchParams(); // 검색 파라미터를 가져옵니다.

  const returnTo = searchParams.get('returnTo'); // 검색 파라미터에서 returnTo 값을 가져옵니다.

  const password = useBoolean(); // 비밀번호 보이기/숨기기 상태를 관리하는 훅을 가져옵니다.

  // Yup을 사용하여 유효성 검사 스키마를 정의합니다.
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  // 기본 값으로 설정할 데이터를 정의합니다.
  const defaultValues = {
    email: 'demo@minimals.cc',
    password: 'demo1234',
  };

  // useForm을 사용하여 React Hook Form을 설정합니다.
  const methods = useForm({
    // resolver: yupResolver(LoginSchema), // Yup 스키마를 resolver로 사용합니다.
    defaultValues, // 기본 값 설정
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // 폼 제출 시 실행될 함수를 정의합니다.
  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.email, data.password); // 로그인 시도

      router.push(returnTo || PATH_AFTER_LOGIN); // 로그인 후 이동할 페이지로 이동
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message); // 오류 메시지 설정
    }
  });

  // 화면 상단에 보여질 내용을 설정합니다.
  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">로그인</Typography>

      <Stack direction="row" spacing={0.5}>
        {/* <Typography variant="body2">New user?</Typography> */}

        {/* <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
          Create an account
        </Link> */}
      </Stack>
    </Stack>
  );

  // 폼 영역에 보여질 내용을 설정합니다.
  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>} {/* 오류 메시지 표시 */}
      <RHFTextField name="email" label="Email address" /> {/* 이메일 입력 필드 */}
      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />{' '}
      {/* 비밀번호 입력 필드와 보이기/숨기기 버튼 */}
      <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
        Forgot password?
      </Link>{' '}
      {/* 비밀번호 재설정 링크 */}
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>{' '}
      {/* 로그인 버튼 */}
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}
      {/* <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert>{' '} */}
      {/* 데모 이메일 및 비밀번호 정보 표시 */}
      {renderForm}
    </FormProvider>
  );
}

// ----------------------------------------------------------

// import * as Yup from 'yup';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

// import Link from '@mui/material/Link';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import LoadingButton from '@mui/lab/LoadingButton';
// import InputAdornment from '@mui/material/InputAdornment';

// import { paths } from 'src/routes/paths';
// import { RouterLink } from 'src/routes/components';
// import { useRouter, useSearchParams } from 'src/routes/hooks';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { useAuthContext } from 'src/auth/hooks';
// import { PATH_AFTER_LOGIN } from 'src/config-global';

// import Iconify from 'src/components/iconify';
// import FormProvider, { RHFTextField } from 'src/components/hook-form';

// // ----------------------------------------------------------------------

// export default function JwtLoginView() {
//   const { login } = useAuthContext();

//   const router = useRouter();

//   const [errorMsg, setErrorMsg] = useState('');

//   const searchParams = useSearchParams();

//   const returnTo = searchParams.get('returnTo');

//   const password = useBoolean();

//   const LoginSchema = Yup.object().shape({
//     email: Yup.string().required('Email is required').email('Email must be a valid email address'),
//     password: Yup.string().required('Password is required'),
//   });

//   const defaultValues = {
//     email: 'demo@minimals.cc',
//     password: 'demo1234',
//   };

//   const methods = useForm({
//     resolver: yupResolver(LoginSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       await login?.(data.email, data.password);

//       router.push(returnTo || PATH_AFTER_LOGIN);
//     } catch (error) {
//       console.error(error);
//       reset();
//       setErrorMsg(typeof error === 'string' ? error : error.message);
//     }
//   });

//   const renderHead = (
//     <Stack spacing={2} sx={{ mb: 5 }}>
//       <Typography variant="h4">Sign in to Minimal</Typography>

//       <Stack direction="row" spacing={0.5}>
//         <Typography variant="body2">New user?</Typography>

//         <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
//           Create an account
//         </Link>
//       </Stack>
//     </Stack>
//   );

//   const renderForm = (
//     <Stack spacing={2.5}>
//       {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

//       <RHFTextField name="email" label="Email address" />

//       <RHFTextField
//         name="password"
//         label="Password"
//         type={password.value ? 'text' : 'password'}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton onClick={password.onToggle} edge="end">
//                 <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />

//       <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
//         Forgot password?
//       </Link>

//       <LoadingButton
//         fullWidth
//         color="inherit"
//         size="large"
//         type="submit"
//         variant="contained"
//         loading={isSubmitting}
//       >
//         Login
//       </LoadingButton>
//     </Stack>
//   );

//   return (
//     <FormProvider methods={methods} onSubmit={onSubmit}>
//       {renderHead}

//       <Alert severity="info" sx={{ mb: 3 }}>
//         Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
//       </Alert>

//       {renderForm}
//     </FormProvider>
//   );
// }
