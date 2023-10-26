import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { GridCellParams, DataGrid, GridToolbar, getGridNumericOperators } from '@mui/x-data-grid';
import { fPercent } from 'src/utils/format-number';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_ROWS, EDIT_ROWS } from 'src/redux/reducer/positionSelectedSlice';

// ----------------------------------------------------------------------

const columns = [
  {
    field: 'id',
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
  {
    field: 'csp',
    type: 'singleSelect',
    headerName: '',
    valueOptions: ['aws', 'gcp'],
    align: 'center',
    headerAlign: 'center',
    width: 30,
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
    field: 'action',
    headerName: ' ',
    align: 'right',
    width: 20,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <IconButton onClick={() => console.info('ID', params.row.id)}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    ),
  },
];

// ----------------------------------------------------------------------

export default function DataGridView({ data }) {
  const [selectedRows, setSelectedRows] = useState([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: false,
  });

  if (columns.length) {
    const ratingColumn = columns.find((column) => column.field === 'rating');

    const ratingColIndex = columns.findIndex((col) => col.field === 'rating');

    const ratingFilterOperators = getGridNumericOperators().map((operator) => ({
      ...operator,
      InputComponent: RatingInputValue,
    }));
    columns[ratingColIndex] = {
      ...ratingColumn,
      filterOperators: ratingFilterOperators,
    };
  }

  const handleChangeColumnVisibilityModel = useCallback((newModel) => {
    setColumnVisibilityModel(newModel);
  }, []);

  const hiddenFields = ['id', 'action'];

  const getTogglableColumns = () =>
    columns.filter((column) => !hiddenFields.includes(column.field)).map((column) => column.field);

  const selected = data.filter((row) => selectedRows.includes(row.id));

  // console.info('SELECTED ROWS', selected);
  const positionSelected = useSelector((state) => state.positionSelected.value);
  const dispatch = useDispatch();

  let checkboxSelected = null;

  return (
    <DataGrid
      // checkboxSelection
      // disableRowSelectionOnClick

      rows={data}
      columns={columns}
      isCellEditable={(params) => false}
      sx={{
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
          outline: 'none !important',
        },
      }}
      onRowSelectionModelChange={(newSelectionModel) => {
        setSelectedRows(newSelectionModel);
        // console.info('newSelectionModel', newSelectionModel);

        checkboxSelected = data.filter((row) => newSelectionModel.includes(row.id));
        // console.info('selected2', checkboxSelected);
        dispatch(ADD_ROWS(checkboxSelected));
      }}
      columnVisibilityModel={columnVisibilityModel}
      onColumnVisibilityModelChange={handleChangeColumnVisibilityModel}
      // slots={{
      //   toolbar: GridToolbar,
      // }}
      slotProps={{
        columnsPanel: {
          getTogglableColumns,
        },
      }}
    />
  );
}

DataGridView.propTypes = {
  data: PropTypes.array,
};

// ----------------------------------------------------------------------

function RatingInputValue({ item, applyValue }) {
  return (
    <Box sx={{ p: 1, height: 1, alignItems: 'flex-end', display: 'flex' }}>
      <Rating
        size="small"
        precision={0.5}
        placeholder="Filter value"
        value={Number(item.value)}
        onChange={(event, newValue) => {
          applyValue({ ...item, value: newValue });
        }}
      />
    </Box>
  );
}

RatingInputValue.propTypes = {
  applyValue: PropTypes.func,
  item: PropTypes.object,
};
