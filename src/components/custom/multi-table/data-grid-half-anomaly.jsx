import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { DataGrid, getGridNumericOperators } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import {useTable, TableSelectedAction, TableHeadCustom } from 'src/components/table';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import Container from '@mui/material/Container';
// import TableBody from '@mui/material/TableBody';
// import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import Scrollbar from 'src/components/scrollbar';
import { useBoolean } from 'src/hooks/use-boolean';
import Checkbox from '@mui/material/Checkbox';
import { ConfirmDialog } from 'src/components/custom-dialog';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';

import { SELECT_Anomaly } from 'src/redux/reducer/anomaly/list/anomalySelectedSlice';
import { deleteAnomalyIP, deleteAnomalyTime } from 'src/_mock';


// ----------------------------------------------------------------------

export default function AnomalyDataGridHalf({ data, columns, action }) {
  const ip_TABLE_HEAD = [
    { id: columns.ip, label: 'IP 목록', flex: 1 },
  ];
  const time_TABLE_HEAD = [
    { id: columns.group, label: '그룹명', flex: 1 },
    { id: columns.startTime, label: '시작 시간', flex: 1 },
    { id: columns.endTime, label: '종료 시간', flex: 1 },
  ];

  const headLabel = data.some((row) => 'ip' in row) ? ip_TABLE_HEAD : time_TABLE_HEAD;

  const table = useTable();
  const confirm = useBoolean();

  const [tableData, setTableData] = useState(data);

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


  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();

  const handleDeleterows = async (selectedRows) => {
    console.log(selectedRows);
  
    // 선택된 행이 여러 개인 경우
    if (selectedRows.length > 1) {
      selectedRows.forEach(async (selectedRow) => {
        console.log(selectedRow)
        // 선택된 행의 키에 'ip'가 있는 경우
        if ('ip' in data[selectedRow]) {
          // deleteAnomalyIP 함수에 해당 행의 IP를 전달하여 삭제
          if (await deleteAnomalyIP(data[selectedRow].ip)) {
            window.location.reload();
          }
        }
        else if ('group' in data[selectedRow]) {
          if (await deleteAnomalyTime(data[selectedRow].group)){
            window.location.reload();
          }
        }
      });
    } else {
      // 선택된 행이 하나인 경우
      const selectedRow = selectedRows[0];
  
      // 선택된 행의 키에 'ip'가 있는 경우
      if ('ip' in data[selectedRow]) {
        // deleteAnomalyIP 함수에 해당 행의 IP를 전달하여 삭제
        if (await deleteAnomalyIP(data[selectedRow].ip)) {
          window.location.reload();
        }
      }
      else if ('group' in data[selectedRow]) {
        if (await deleteAnomalyTime(data[selectedRow].group)){
          window.location.reload();
        }
      }
    }
  };

  return (
    <>
    <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
      <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />
      <Scrollbar>
        <Table size="medium">
        <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={headLabel}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />
          <TableBody>
            {data.map((row) => (
               <TableRow key={row.id} 
                hover selected={selected}
                >
                 <TableCell padding="checkbox">
                   <Checkbox
      checked={table.selected.includes(row.id)}
      onClick={() => {
        table.onSelectRow(row.id);
        dispatch(SELECT_Anomaly(row));
      }}
    />       
                 </TableCell>
                 {columns.map((column) => (
                  <TableCell key={column.field}>
                    {column.renderCell ? column.renderCell({ row }) : row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
            </Scrollbar>
            </TableContainer> 

    <ConfirmDialog
    open={confirm.value}
    onClose={confirm.onFalse}
    title="Delete"
    content={
      <>
        정말로 <strong> {table.selected.length} </strong> 개의 아이템을 삭제하시겠습니까? 
      </>
    }
    action={
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          handleDeleterows(table.selected);
          confirm.onFalse();
        }}
      >
        삭제
      </Button>
}
/>
</>
    
  );
 
}

AnomalyDataGridHalf.propTypes = {
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
