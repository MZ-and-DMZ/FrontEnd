import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';

import { useDispatch } from 'react-redux';

import { INPUT_USERNAME } from 'src/redux/reducer/user/create/userNameSlice';
import { INPUT_CSP } from 'src/redux/reducer/user/create/cspSlice';
import { INPUT_AWSACCOUNT } from 'src/redux/reducer/user/create/awsAccountSlice';
import { INPUT_GCPACCOUNT } from 'src/redux/reducer/user/create/gcpAccountSlice';
import { INPUT_DESCRIPTION } from 'src/redux/reducer/user/create/descriptionSlice';
import { INPUT_DUTY } from 'src/redux/reducer/user/create/dutySlice';
import { INPUT_DEPARTMENT } from 'src/redux/reducer/user/create/departmentSlice';
import { INPUT_ATTACHEDGROUP } from 'src/redux/reducer/user/create/attachedGroupSlice';
// ----------------------------------------------------------------------

export default function RHFTextField({ name, helperText, type, ...other }) {
  const dispatch = useDispatch();
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
            if (name === 'userName') dispatch(INPUT_USERNAME(event.target.value));
            else if (name === 'description') dispatch(INPUT_DESCRIPTION(event.target.value));
            else if (name === 'csp') dispatch(INPUT_CSP(event.target.value));
            else if (name === 'awsAccount') dispatch(INPUT_AWSACCOUNT(event.target.value));
            else if (name === 'gcpAccount') dispatch(INPUT_GCPACCOUNT(event.target.value));
            else if (name === 'duty') dispatch(INPUT_DUTY(event.target.value));
            else if (name === 'department') dispatch(INPUT_DEPARTMENT(event.target.value));
            else if (name === 'attachedGroup') dispatch(INPUT_ATTACHEDGROUP(event.target.value));
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}

RHFTextField.propTypes = {
  helperText: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.string,
};
