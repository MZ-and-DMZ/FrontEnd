import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { DataGrid, getGridNumericOperators } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';

import { ADD_ROWS, DELETE_ROWS, EDIT_ROWS } from 'src/redux/reducer/positionSelectedSlice';

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
  let checkboxSelected = null;

  return (
    <DataGrid
      rows={data}
      columns={columns}
      // getRowHeight={() => 'auto'}
      rowHeight={35}
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
      }}
      columnVisibilityModel={columnVisibilityModel}
      onColumnVisibilityModelChange={handleChangeColumnVisibilityModel}
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
