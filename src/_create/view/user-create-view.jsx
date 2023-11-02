import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { paths } from 'src/routes/paths';

import { _roles, _mock } from 'src/_mock';

import { useTable } from 'src/components/table';

import { useSettingsContext } from 'src/components/settings';

import { EDIT_ROWS } from 'src/redux/reducer/positionSelectedSlice';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import { GetPositions } from './getPositions';
import DataGridCustom from '../data_grid_import';
import DataGridView from '../data_grid_view';
import UserNewEditForm from '../user-new-edit-form';
import UserTableToolbar from '../user-table-toolbar';

// ----------------------------------------------------------------------
async function GetPositions() {
  try {
    // const response = await fetch('http://54.180.76.116:8080/boch/get/positionlist');
    // const response = await fetch('http://localhost:5000/boch/get/positionlist');
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/boch/get/positionlist`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const positionData = await GetPositions();

// const _dataGrid = [...Array(20)].map((_, index) => {
//   const status =
//     (index % 2 && 'online') || (index % 3 && 'alway') || (index % 4 && 'busy') || 'offline';

//   return {
//     id: _mock.id(index),
//     status,
//     email: _mock.email(index),
//     name: _mock.fullName(index),
//     age: _mock.number.age(index),
//     lastLogin: _mock.time(index),
//     isAdmin: _mock.boolean(index),
//     lastName: _mock.lastName(index),
//     rating: _mock.number.rating(index),
//     firstName: _mock.firstName(index),
//     performance: _mock.number.percent(index),
//   };
// });
const _dataGrid = [...Array(positionData.position_list.length)].map((_, index) => ({
  id: positionData.position_list[index]._id.$oid,
  positionName: positionData.position_list[index].positionName,
  isCustom: positionData.position_list[index].isCustom,
  description: positionData.position_list[index].description,
  csp: positionData.position_list[index].csp,
  policies: positionData.position_list[index].policies,
  // create Time, update Time 추가해야함
  // createTime: positionData.position_list[index].createTime,
  // updateTime: positionData.position_list[index].updateTime,
  // 그리고 position List mockData에 aws,gcp가 같이 있는 데이터가 필요함.
  // 그러면 aws 따로, gcp 따로 나눠서 보여줘야함.
  // 데이터도 나눠서 저장되어있으면 좋겠음. 그러면 aws, gcp 따로 나눠서 저장해야함.
}));

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

const _roles2 = positionData.position_list.map((item) => item.positionName);
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
  const _dataGrid2 = [...Array(positionSelected.position_list.length)].map((_, index) => ({
    id: positionSelected.position_list[index].id,
    positionName: positionSelected.position_list[index].positionName,
    isCustom: positionSelected.position_list[index].isCustom,
    description: positionSelected.position_list[index].description,
    csp: positionSelected.position_list[index].csp,
    policies: positionSelected.position_list[index].policies,
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

      <Card sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <UserNewEditForm />
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardHeader title="직무" sx={{ mb: 2 }} />
              {/* 필터링 위해서 */}
              <UserTableToolbar filters={filters} onFilters={handleFilters} roleOptions={_roles2} />
              <Box sx={{ height: 720 }}>
                <DataGridView data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardHeader title="추가한 권한/역할" sx={{ mb: 2 }} />
              <Box sx={{ height: 720 }}>
                {/* Change _dataGrid */}
                <DataGridCustom data={_dataGrid2} />
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
    </Container>
  );
}
