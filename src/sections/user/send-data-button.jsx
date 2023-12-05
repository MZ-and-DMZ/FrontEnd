import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { editUserData, createUserData } from 'src/_mock';

export function SendDataButton({ currentUser }) {
  const _updatedUser = {};

  _updatedUser.userName = useSelector((state) => state.userName);
  _updatedUser.csp = useSelector((state) => state.csp);
  _updatedUser.awsAccount = useSelector((state) => state.awsAccount);
  _updatedUser.gcpAccount = useSelector((state) => state.gcpAccount);
  _updatedUser.description = useSelector((state) => state.description);
  _updatedUser.duty = useSelector((state) => state.duty);
  _updatedUser.department = useSelector((state) => state.department);

  _updatedUser.attachedGroup = useSelector((state) => state.attachedGroup);
  _updatedUser.attachedPosition = useSelector((state) => state.attachedPosition);

  return (
    <Button
      variant="contained"
      color="primary"
      // send data to backend
      // data={_dataGrid}
      onClick={() => {
        if (currentUser) editUserData(currentUser, _updatedUser);
        else createUserData(_updatedUser);
        // dispatch(ADD_ROWS(_dataGrid));
      }}
      sx={{ mt: 3, mr: 3 }}
    >
      {!currentUser ? 'Create User' : 'Save Changes'}
    </Button>
  );
}

SendDataButton.propTypes = {
  currentUser: PropTypes.object,
};
