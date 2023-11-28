import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  _awsPolicyList,
  _gcpRoleList,
  _positionList,
  _roles,
  _mock,
  convertPosition,
} from 'src/_mock';

import Label from 'src/components/label';
import { useTable } from 'src/components/table';
import DataGridHalf from 'src/components/custom/multi-table/data-grid-half';
import { UPDATE_STEP3 } from 'src/redux/reducer/position/create/step3Slice';
import { ADD_ROWS, INIT_ROWS } from 'src/redux/reducer/user/create/attachedPositionSlice';
import { SELECT_POSITION } from 'src/redux/reducer/position/list/positionSelectedSlice';

// ----------------------------------------------------------------------
const columns = [
  {
    field: 'id',
  },
  {
    field: 'csp',
    type: 'singleSelect',
    headerName: '',
    valueOptions: ['aws', 'gcp'],
    align: 'center',
    headerAlign: 'center',
    width: 40,
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
    field: 'name',
    headerName: 'AWS권한/GCP역할',

    headerAlign: 'left',
    width: 250,
  },
  // {
  //   field: 'description',
  //   headerName: '설명',
  //   flex: 1,
  //   editable: true,
  //   align: 'left',
  // },
];

const defaultFilters = {
  positionName: '',
  policies: [],
  status: 'all',
};

// ----------------------------------------------------------------------

export default function PositionMultiTable() {
  const dispatch = useDispatch();

  // 두 리스트를 합침
  const _rolesList = useMemo(() => [..._gcpRoleList, ..._awsPolicyList], []);
  // console.info('_rolesList', _rolesList); // [{id, name, csp}, ...}]

  // 미리 선언. policyRows에 convert한 {id, name, csp} 형태로 저장됨
  const _reduxList = useSelector((state) => state.attachedPosition); // dataGridHalf에서 attachedPosition을 사용함
  // console.info('_reduxList', _reduxList); // [{id, name, csp}, ...}]

  // currntPosition을 가져옴 없으면 [{id, positionName, description, csp, policies["Compute Instance Admin (beta)",...]}, ...]
  const currentPosition = useSelector((state) => state.positionSelected);

  // useEffect로 convertPositon으로 fetch한 결과를  _roelsList에서 가져옴 ['roles/pubsub.admin', ...]
  const [convertedPolicies, setConvertedPolicies] = useState([]);
  // console.info('convertedPolicies', convertedPolicies);
  useEffect(() => {
    function _convertPosition(positionName) {
      const result = convertPosition(positionName).then((res) => {
        const resArray = [...res.convert_policies];
        setConvertedPolicies(resArray);
        console.log('res', resArray);
        return res;
      });
    }

    if (Object.keys(currentPosition).length !== 0) {
      _convertPosition(currentPosition.positionName);
      // console.info('resultPolicies', resultPolicies);
      // dispatch(STEP3_DATA(resultPolicies));
    } else {
      console.log('currentPosition is null', currentPosition);
    }
  }, [currentPosition]);

  // _rolesList에서 _rolesList.name과  convertedPolicies.positionName이 같은 것들을 dispatch(ADD_ROWS)로 보냄
  useEffect(() => {
    if (convertedPolicies.length > 0) {
      dispatch(
        ADD_ROWS(
          _rolesList.filter((role) =>
            convertedPolicies.find(
              (policy) =>
                (role.csp === 'gcp' && policy === role.gcpName) ||
                (role.csp === 'aws' && policy === role.name)
            )
          )
        )
      );
    } else {
      console.log('convertedPolicies is null', convertedPolicies);
    }
  }, [convertedPolicies, _rolesList, dispatch]);

  // step2에서 convert한 positionName을 가져옴
  const convertedPosition = useSelector((state) => state.step2);

  // convertedPosition을 _rolesList에서 찾아서 _reduxList에 추가함
  useEffect(() => {
    if (convertedPosition.length > 0) {
      dispatch(
        ADD_ROWS(
          _rolesList.filter((role) =>
            [...convertedPosition].find(
              (policy) =>
                (role.csp === 'gcp' && policy === role.gcpName) ||
                (role.csp === 'aws' && policy === role.name)
            )
          )
        )
      );
    } else {
      console.log('convertedPosition is null', convertedPosition);
    }
  }, [convertedPosition, _rolesList, dispatch]);

  return (
    <Grid container spacing={2}>
      {/* <Grid item xs={12}></Grid> */}
      <Grid item xs={6}>
        <Card>
          <CardHeader title="직무" sx={{ mb: 2 }} />
          <Box sx={{ height: 720 }}>
            <DataGridHalf data={_rolesList} columns={columns} action="add" />
          </Box>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardHeader title="추가한 권한/역할" sx={{ mb: 2 }} />

          <Box sx={{ height: 720 }}>
            {/* Change _dataGrid */}
            <DataGridHalf data={_reduxList} columns={columns} action="delete" />
            {/* <DataGridCustom data={_dataGrid} /> */}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
