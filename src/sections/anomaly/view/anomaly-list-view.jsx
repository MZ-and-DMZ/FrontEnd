import isEqual from 'lodash/isEqual';

import { useState, useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import DataGridHalf from 'src/components/custom/multi-table/data-grid-half';
import Typography from '@mui/material/Typography';


import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { _anomalyTimeList, _anomalyIPList, _AwsUserList, POSITION_CSP_OPTIONS , AWS_OPTIONS} from 'src/_mock';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
import { SELECT_POSITION } from 'src/redux/reducer/position/list/positionSelectedSlice';

// import AWSTableRow from '../aws-table-row';
// import AWSTableToolbar from '../aws-table-toolbar';
// import AWSTableFiltersResult from '../aws-table-filters-result';

// ----------------------------------------------------------------------

// const CSP_OPTIONS = [{ value: 'all', label: 'All' }, ...POSITION_CSP_OPTIONS];
// const AWS_OPTIONS = [{ value: 'aws', label: 'AWS' }, ...POSITION_CSP_OPTIONS];

const TABLE_HEAD = [
  { id: 'name', label: '사용자', width: 300 },
  { id: 'groups', label: '그룹', width: 500 },
  { id: 'isMfaEnabled', label: 'MFA 여부', width: 300 },
  { id: 'AttachedPolicies', label: '정책', width: 500 },
  { id: '', width: 88 },
];

const defaultFilters = {
  userName: '',
};

// ----------------------------------------------------------------------

export default function AnomalyListView() {
  const table = useTable();

  const dispatch = useDispatch();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(_AwsUserList);

  const [filters, setFilters] = useState(defaultFilters);

  // const dataFiltered = applyFilter({
  //   inputData: tableData,
  //   comparator: getComparator(table.order, table.orderBy),
  //   filters,
  // });


  // const dataInPage = dataFiltered.slice(
  //   table.page * table.rowsPerPage,
  //   table.page * table.rowsPerPage + table.rowsPerPage
  // );

  const denseHeight = table.dense ? 32 : 40;

  const canReset = !isEqual(defaultFilters, filters);

  const timecolumns = [
    {
      field: 'id',
    },
    // {
    //   field: 'csp',
    //   type: 'singleSelect',
    //   headerName: '',
    //   valueOptions: ['aws', 'gcp', 'aws, gcp'],
    //   align: 'center',
    //   headerAlign: 'center',
    //   width: 40,
    //   renderCell: (params) => (
    //     <Label
    //       variant="soft"
    //       color={
    //         (params.row.csp === '' && 'error') || (params.row.csp === 'aws' && 'warning') || 'success'
    //       }
    //       sx={{ mx: 'auto' }}
    //     >
    //       {params.row.csp}
    //     </Label>
    //   ),
    // },
    {
      field: 'group',
      headerName: '그룹명',
      flex: 1,
      editable: true,
    },
    {
      field: 'startTime',
      headerName: '시작 시간',
      flex: 1,
      editable: true,
    },
    {
      field: 'endTime',
      headerName: '종료 시간',
      flex: 1,
      editable: true,
    },
    // {
    //   field: 'policies',
    //   headerName: 'AWS권한/GCP역할',
    //   align: 'left',
    //   headerAlign: 'left',
    //   width: 250,
    // },
  ];

  const ipcolumns = [
    {
      field: 'id',
    },
    {
      field: 'ip',
      headerName: 'IP 목록',
      flex: 1,
      editable: true,
    },
  ];


  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="이상탐지"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: '이상탐지', href: paths.dashboard.anomaly.root },
            { name: '목록' },
          ]}
        />
<Grid container spacing={2}>
      {/* <Grid item xs={12}></Grid> */}
      <Grid item xs={6}>
        <Card>
        <CardHeader
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="div">
              허용된 시간대 목록
            </Typography>
            <Button
              component={RouterLink}
              href={paths.dashboard.anomaly.newTime} 
              // variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Time
            </Button>
          </div>
        }
        sx={{ mb: 2 }}/>
          {/* 필터링 위해서 */}
          {/* <UserTableToolbar filters={filters} onFilters={handleFilters} roleOptions={_roles2} /> */}
          <Box sx={{ height: 720 }}>
            <DataGridHalf data={_anomalyTimeList} columns={timecolumns}/>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
        <CardHeader
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="div">
              허용된 IP 목록
            </Typography>
            <Button
              component={RouterLink}
              href={paths.dashboard.anomaly.newIP} 
              // variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New IP
            </Button>
          </div>
        }
        sx={{ mb: 2 }}/>
          {/* <UserTableToolbar filters={filters} onFilters={handleFilters} roleOptions={_roles2} /> */}
          <Box sx={{ height: 720 }}>
            {/* Change _dataGrid */}
            <DataGridHalf data={_anomalyIPList} columns={ipcolumns}/>
            {/* {console.info('_reduxList', _reduxList)} */}
            {/* <DataGridCustom data={_dataGrid} /> */}
          </Box>
        </Card>
      </Grid>
    </Grid>

    
       
    </Container>

     
    </>
  );
}

// ----------------------------------------------------------------------

// function applyFilter({ inputData, comparator, filters }) {
//   const { name} = filters;

//   const stabilizedThis = inputData.map((el, index) => [el, index]);

//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });

//   inputData = stabilizedThis.map((el) => el[0]);


//   console.log(name)
//   if (name && name.userName !== undefined) {
//     console.log(name.userName);
//     inputData = inputData.filter(
//       (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
//     );
//   }
  
//   if (name) {
//     inputData = inputData.filter(
//       (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
//     );
//   }

//   // if (csp !== 'all') {
//   //   inputData = inputData.filter((user) => user.csp === csp);
//   // }

//   // if (positionName && typeof positionName === 'string') {
//   //   inputData = inputData.filter(
//   //     (user) => user.positionName.toLowerCase().indexOf(positionName.toLowerCase()) !== -1
//   //   );
//   // }

//   return inputData;
// }
