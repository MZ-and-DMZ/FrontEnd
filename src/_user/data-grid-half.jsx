import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridToolbar, getGridNumericOperators } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';

import { fPercent } from 'src/utils/format-number';

import { ADD_ROWS, DELETE_ROWS, EDIT_ROWS } from 'src/redux/reducer/positionSelectedSlice';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

// const columns = [
//   {
//     field: 'id',
//   },
//   {
//     field: 'csp',
//     type: 'singleSelect',
//     headerName: 'Cloud',
//     valueOptions: ['aws', 'gcp'],
//     align: 'center',
//     headerAlign: 'center',
//     width: 120,
//     renderCell: (params) => (
//       <Label
//         variant="soft"
//         color={
//           (params.row.csp === '' && 'error') || (params.row.csp === 'aws' && 'warning') || 'success'
//         }
//         sx={{ mx: 'auto' }}
//       >
//         {params.row.csp}
//       </Label>
//     ),
//   },
//   {
//     field: 'positionName',
//     headerName: 'Position Name',
//     flex: 1,
//     editable: true,
//   },
//   {
//     field: 'policies',
//     headerName: 'AWS권한/GCP역할',
//     align: 'left',
//     headerAlign: 'left',
//     width: 200,
//   },
//   // {
//   //   field: 'action',
//   //   headerName: ' ',
//   //   align: 'right',
//   //   width: 60,
//   //   sortable: false,
//   //   filterable: false,
//   //   disableColumnMenu: true,
//   //   renderCell: (params) => (
//   //     <IconButton onClick={() => console.info('ID', params.row.id)}>
//   //       <Iconify icon="eva:more-vertical-fill" />
//   //     </IconButton>
//   //   ),
//   // },
// ];

// ----------------------------------------------------------------------

export default function DataGridHalf({ data, columns, action }) {
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
  const positionSelected = useSelector((state) => state.positionSelected);
  const dispatch = useDispatch();
  // console.info('SELECTED ROWS', selected);
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
        checkboxSelected = data.filter((row) => newSelectionModel.includes(row.id));
        // console.info('selected2', checkboxSelected);
        if (action === 'delete') {
          dispatch(DELETE_ROWS(checkboxSelected));
        } else if (action === 'edit') {
          dispatch(EDIT_ROWS(checkboxSelected));
        } else if (action === 'add') {
          dispatch(ADD_ROWS(checkboxSelected));
        }
        // switch (action) {
        //   case 'delete':
        //     dispatch(DELETE_ROWS(checkboxSelected));
        //     break;
        //   case 'edit':
        //     dispatch(EDIT_ROWS(checkboxSelected));
        //     break;
        //   case 'add':
        //     dispatch(ADD_ROWS(checkboxSelected));
        //     break;
        //   default:
        //     break;
        // }
        // dispatch(DELETE_ROWS(checkboxSelected));
        // dispatch(EDIT_ROWS(checkboxSelected));
      }}
      columnVisibilityModel={columnVisibilityModel}
      onColumnVisibilityModelChange={handleChangeColumnVisibilityModel}
      // Dence, filter, export 같은 거 추가하는 코드
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

DataGridHalf.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  action: PropTypes.string,
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
