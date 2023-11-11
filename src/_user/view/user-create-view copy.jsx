import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import Label from 'src/components/label/label';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { paths } from 'src/routes/paths';

import { _positionList, _roles, _mock } from 'src/_mock';

import { useTable } from 'src/components/table';
import { useSettingsContext } from 'src/components/settings';

import { EDIT_ROWS } from 'src/redux/reducer/positionSelectedSlice';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import { GetPositions } from './getPositions';
import DataGridView from '../data_grid_view';
import DataGridImport from '../data_grid_import';
import DataGridHalf from '../data-grid-half';
import UserNewEditForm from '../user-new-edit-form';
import UserTableToolbar from '../user-table-toolbar';

// ----------------------------------------------------------------------
const columns = [
  {
    field: 'id',
  },
  {
    field: 'csp',
    type: 'singleSelect',
    headerName: 'Cloud',
    valueOptions: ['aws', 'gcp'],
    align: 'center',
    headerAlign: 'center',
    width: 120,
    renderCell: (params) => (
      <Label
        variant="soft"
        color={
          (params.row.csp === '' && 'error') || (params.row.csp === 'aws' && 'warning') || 'success'
        }
        sx={{ mx: 'auto' }}
      >
        {params.row.csp}
      </Label>
    ),
  },
  {
    field: 'positionName',
    headerName: 'Position Name',
    flex: 1,
    editable: true,
  },
  {
    field: 'policies',
    headerName: 'AWS권한/GCP역할',
    align: 'left',
    headerAlign: 'left',
    width: 200,
  },
  // {
  //   field: 'action',
  //   headerName: ' ',
  //   align: 'right',
  //   width: 60,
  //   sortable: false,
  //   filterable: false,
  //   disableColumnMenu: true,
  //   renderCell: (params) => (
  //     <IconButton onClick={() => console.info('ID', params.row.id)}>
  //       <Iconify icon="eva:more-vertical-fill" />
  //     </IconButton>
  //   ),
  // },
];

const defaultFilters = {
  positionName: '',
  policies: [],
  status: 'all',
};

// const defaultFilters = {
//   name: '',
//   role: [],
//   status: 'all',
// };

const _roles2 = _positionList.map((item) => item.positionName);
console.info('_roles2', _roles2);
export default function UserCreateView() {
  // const [filters, setFilters] = useState(defaultFilters);
  const _checked = null;
  const settings = useSettingsContext();
  const [filters, setFilters] = useState(defaultFilters);

  const table = useTable();

  const handleFilters = useCallback(
    (positionName, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [positionName]: value,
      }));
    },
    [table]
  );

  // const handleFilters = useCallback(
  //   (name, value) => {
  //     table.onResetPage();
  //     setFilters((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   },
  //   [table]
  // );
  let positionSelected = null;
  positionSelected = useSelector((state) => state.positionSelected);
  const dispatch = useDispatch();
  const _reduxList = [...Array(positionSelected.length)].map((_, index) => ({
    id: positionSelected[index].id,
    positionName: positionSelected[index].positionName,
    isCustom: positionSelected[index].isCustom,
    description: positionSelected[index].description,
    csp: positionSelected[index].csp,
    policies: positionSelected[index].policies,
  }));

  // const formatSelected = {
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
        <Grid container spacing={2}>
          {/* <Grid item xs={12}></Grid> */}
          <Grid item xs={6}>
            <Card>
              <CardHeader title="직무" sx={{ mb: 2 }} />
              {/* 필터링 위해서 */}
              <UserTableToolbar filters={filters} onFilters={handleFilters} roleOptions={_roles2} />
              <Box sx={{ height: 720 }}>
                <DataGridHalf data={_positionList} columns={columns} action="add" />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardHeader title="추가한 권한/역할" sx={{ mb: 2 }} />
              <UserTableToolbar filters={filters} onFilters={handleFilters} roleOptions={_roles2} />
              <Box sx={{ height: 720 }}>
                {/* Change _dataGrid */}
                <DataGridHalf data={_reduxList} columns={columns} action="delete" />
                {console.info('_reduxList', _reduxList)}
                {/* <DataGridCustom data={_dataGrid} /> */}
              </Box>
            </Card>
          </Grid>
        </Grid>
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
