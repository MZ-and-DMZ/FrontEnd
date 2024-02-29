import PropTypes from 'prop-types';
import { useState, useCallback, Fragment } from 'react';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { DataGrid, getGridNumericOperators } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import {useTable, TableSelectedAction, TableHeadCustom, getComparator, TablePaginationCustom, TableEmptyRows, TableNoData, emptyRows } from 'src/components/table';
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
import Label from 'src/components/label';
import { isEqual } from 'lodash';
import IDPTableToolbar from './ad-table-toolbar';
import IDPTableFiltersResult from './ad-table-filters-result';


const defaultFilters = {
  input: '',
};

// ----------------------------------------------------------------------

export default function ADTable({ data, TABLE_HEAD, columns, selected}) {
  const table = useTable();
  const confirm = useBoolean();

  const denseHeight = table.dense ? 32 : 40;

  const [tableData, setTableData] = useState(data);

  const handleDeleteRows = async (selectedRows) => {
    // console.log(selectedRows);
  
    // 선택된 행이 여러 개인 경우
    // if (selectedRows.length > 1) {
    //   selectedRows.forEach(async (selectedRow) => {
    //     console.log(selectedRow)
    //     // 선택된 행의 키에 'ip'가 있는 경우
    //     if ('ip' in data[selectedRow]) {
    //       // deleteAnomalyIP 함수에 해당 행의 IP를 전달하여 삭제
    //       if (await deleteAnomalyIP(data[selectedRow].ip)) {
    //         window.location.reload();
    //       }
    //     }
    //     else if ('group' in data[selectedRow]) {
    //       if (await deleteAnomalyTime(data[selectedRow].group)){
    //         window.location.reload();
    //       }
    //     }
    //   });
    // } else {
    //   // 선택된 행이 하나인 경우
    //   const selectedRow = selectedRows[0];
  
    //   // 선택된 행의 키에 'ip'가 있는 경우
    //   if ('ip' in data[selectedRow]) {
    //     // deleteAnomalyIP 함수에 해당 행의 IP를 전달하여 삭제
    //     if (await deleteAnomalyIP(data[selectedRow].ip)) {
    //       window.location.reload();
    //     }
    //   }
    //   else if ('group' in data[selectedRow]) {
    //     if (await deleteAnomalyTime(data[selectedRow].group)){
    //       window.location.reload();
    //     }
    //   }
    // }
  };

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  // console.log(dataFiltered);
  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const canReset = !isEqual(defaultFilters, filters);

  // const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  // const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();

  const handleFilters = useCallback(
    (name, value) => {
      // value가 입력한 값임
      // console.log(name, value);
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      // console.log(filters);
    },
    [table]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // renderTableCellContent 함수 정의
  function renderTableCellContent(row, column) {
    const cellData = row[column.field];
    
    // roles 가 있으면 type으로 태그 달기
    if (column.field === "member") {
      // console.log("확인", column.field);
      // console.log(cellData);

      return (
        <TableCell>
          {cellData.map((item, index) => (
              <Fragment key={index}>
                {item}
                <br/>
              </Fragment>
          ))}
        </TableCell>
      );
    }
    if (column.field === "whenChanged") {
      return cellData.replace('T', ' ').replace('Z', '');
    }
  
    if (Array.isArray(cellData)) {
        return cellData.join(', ');
    } 
  return cellData;
}


  return (
    <>
    <IDPTableToolbar
          // 검색창임
            filters={filters}
            onFilters={handleFilters}
            // FilterOptions={_anomaly_cloumn}
          />

          {canReset && (
            <IDPTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              onResetFilters={handleResetFilters}
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
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
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
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
              {dataFiltered
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row) => (
                  <TableRow key={row.id} hover selected={selected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={table.selected.includes(row.id)}
                        onClick={() => {
                          table.onSelectRow(row.id);
                          // dispatch(SELECT_Anomaly(row));
                        }}
                      />       
                    </TableCell>

                    {columns.map((column) => (
                      <TableCell key={column.field}>
                        {column.renderCell ? column.renderCell({ row }) : renderTableCellContent(row, column)}
                      </TableCell>
                    ))}


                  </TableRow>
              ))}

              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
              />

              {/* <TableNoData notFound={notFound} /> */}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={dataFiltered.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        //
        dense={table.dense}
        onChangeDense={table.onChangeDense}
      />
          
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
              handleDeleteRows(table.selected);
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

ADTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  TABLE_HEAD: PropTypes.object,
  selected: PropTypes.bool,
};

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { input } = filters;
  // console.log(inputData);

  if (input) {
    inputData = inputData.filter((value) =>
      value.name.toLowerCase().includes(input.toLowerCase()) 
      // value.num ? String(value.num).includes(String(input).toLowerCase()) : '' ||
      // value.members ? value.members.some((member) =>member.toLowerCase().includes(input.toLowerCase())) : ''
      // value.groups.toLowerCase().includes(input.toLowerCase()) ||
      // value.roles.toLowerCase().includes(input.toLowerCase()) ||
      // value.rootUrl.toLowerCase().includes(input.toLowerCase()) ||
      // value.baseUrl.toLowerCase().includes(input.toLowerCase()) ||
      // value.protocol.toLowerCase().includes(input.toLowerCase()) 
      // alarm.unique_sourceipaddress.some((ip) => ip.toLowerCase().includes(inputeventname.toLowerCase()))
      );
  }

  return inputData;
}