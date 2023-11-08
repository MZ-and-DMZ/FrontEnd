import Card from '@mui/material/Card';

import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { paths } from 'src/routes/paths';

import { _positionList, _roles, _mock } from 'src/_mock';

import Label from 'src/components/label';
import { useTable } from 'src/components/table';
import { useSettingsContext } from 'src/components/settings';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import { GetPositions } from './getPositions';
import UserNewEditForm from '../user-new-edit-form';
import UserTableToolbar from '../user-table-toolbar';
import PositionMultiTable from '../position-multi-table';

// ----------------------------------------------------------------------

export default function UserCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new user"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'User',
            href: paths.dashboard.user.root,
          },
          { name: 'New user' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card sx={{ p: 3, m: 2 }}>
        <UserNewEditForm />
        <PositionMultiTable />
        {/* <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
        
            {!currentUser ? 'Create User' : 'Save Changes'}
          </LoadingButton>
        </Stack> */}
      </Card>
      {/* <Button
        variant="contained"
        color="primary"
        // send data to backend
        // data={_dataGrid}
        onClick={() => {
          console.info('_dataGrid', _dataGrid);
          // dispatch(ADD_ROWS(_dataGrid));
        }
        sx={{ mt: 3, mr: 3 }}
      >
        Create
      </Button> */}
    </Container>
  );
}
