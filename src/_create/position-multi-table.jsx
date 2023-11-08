import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { _positionList, _roles, _mock } from 'src/_mock';

import Label from 'src/components/label';
import { useTable } from 'src/components/table';
import DataGridHalf from 'src/components/custom/multi-table/data-grid-half';

import UserTableToolbar from './user-table-toolbar';

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
];

const _roles2 = _positionList.map((item) => item.positionName);

const defaultFilters = {
  positionName: '',
  policies: [],
  status: 'all',
};

// ----------------------------------------------------------------------

// currentUser 값이 true면 edit이므로 기존에 선택된 권한/역할을 백엔드에서 가져와야됨
// 아직 미구현

export default function PositionMultiTable({ currentUser }) {
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
  // const dispatch = useDispatch();
  const _reduxList = [...Array(positionSelected.length)].map((_, index) => ({
    id: positionSelected[index].id,
    positionName: positionSelected[index].positionName,
    isCustom: positionSelected[index].isCustom,
    description: positionSelected[index].description,
    csp: positionSelected[index].csp,
    policies: positionSelected[index].policies,
  }));

  return (
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
  );
}

PositionMultiTable.propTypes = {
  currentUser: PropTypes.object,
};
