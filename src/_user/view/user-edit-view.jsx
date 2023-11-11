import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import { CardContent } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { paths } from 'src/routes/paths';

import { _positionList, _userList, _roles, _mock, sendUserData } from 'src/_mock';

import Label from 'src/components/label';
import { useTable } from 'src/components/table';
import { useSettingsContext } from 'src/components/settings';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import { GetPositions } from './getPositions';
import UserNewEditForm from '../user-new-edit-form';
import UserTableToolbar from '../user-table-toolbar';
import PositionMultiTable from '../position-multi-table';

// ----------------------------------------------------------------------

export default function UserEditView({ id }) {
  const settings = useSettingsContext();

  const currentUser = _userList.find((user) => user.id === id);
  // console.info(
  //   'currentUser',
  //   _userList.find((user) => user.id === id)
  // );
  // console.log('in id', id);
  // console.log('type', typeof id);
  let _reduxList = null;
  _reduxList = useSelector((state) => state.positionSelected);

  let _redux = null;
  _redux = useSelector((state) => state.userName);
  console.info('_reduxName', _redux);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit a new user"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'User',
            href: paths.dashboard.user.root,
          },
          { name: currentUser?.userName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {/* <Card sx={{ p: 3, m: 2 }}> */}
      <Card sx={{ p: 3 }}>
        {/* 두개가 메인 */}
        <UserNewEditForm currentUser={currentUser} />
        <PositionMultiTable currentUser={currentUser} />

        {/* 나중에 버튼도 바꿀 수 있음 */}
        <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            // send data to backend
            // data={_dataGrid}
            onClick={() => {
              console.info('_dataGrid', _reduxList);
              sendUserData(currentUser, _reduxList);
              console.log('currentUser', currentUser);
              // sendUserData(_redux, _reduxList);
              // dispatch(ADD_ROWS(_dataGrid));
              //
            }}
            sx={{ mt: 3, mr: 3 }}
          >
            Edit
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

UserEditView.propTypes = {
  id: PropTypes.string,
};
