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

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { _anomaly_cloumn, ANOMALY_OPTIONS, _AnomalyAlarmList} from 'src/_mock';

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

import AnomalyTableRow from '../anomaly-table-row';
import AWSTableToolbar from '../anomaly-table-toolbar';
import AWSTableFiltersResult from '../anomaly-table-filters-result';
// import { ConstructionOutlined } from '@mui/icons-material';

// ----------------------------------------------------------------------

// const CSP_OPTIONS = [{ value: 'all', label: 'All' }, ...POSITION_CSP_OPTIONS];
// const AWS_OPTIONS = [{ value: 'aws', label: 'AWS' }, ...POSITION_CSP_OPTIONS];
const CSP_OPTIONS = [{ value: 'all', label: 'All' }, ...ANOMALY_OPTIONS];

const TABLE_HEAD = [
  { id: 'useridentity_username', label: '사용자', width: 300 },
  { id: 'eventname', label: '사용한 api 권한', width: 500 },
  { id: 'eventsource', label: '이벤트소스', width:700 },
  { id: 'csp', label: 'csp', width: 500 },
  { id: 'unique_sourceipaddress', label: 'ip', width: 500 },
  { id: 'latest_time', label: '시간', width: 500 },
  { count: 'count', label: '개수', width: 500 },
  // { id: '', width: 88 },
];

const defaultFilters = {
  // userName: '',
  detection: 'all',
  inputeventname: '',
  column: '',
};

// ----------------------------------------------------------------------

export default function AnomalyAlarmListView() {
  const table = useTable();

  const dispatch = useDispatch();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(_AnomalyAlarmList);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });


  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 32 : 40;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name, value) => {
      // value가 입력한 값임
      console.log(name, value);
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      // console.log(filters);
    },
    [table]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('detection', newValue);
    },
    [handleFilters]
  );

  // const handleSearch = (event) => {
  //   const query = event.target.value.toLowerCase();
  //   setSearchQuery(query);

  //   const filteredServices = awsServiceList.filter((service) =>
  //     service.actionCrudName.toLowerCase().includes(query)
  //   );

  //   // setFilteredServiceList(filteredServices);
  // };

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  // const handleEditRow = useCallback(
  //   (id) => {
  //     router.push(paths.dashboard.aws.edit(id));
  //   },
  //   [router]
  // );

  const handleFilterCSP = useCallback(
    (event, newValue) => {
      handleFilters('csp', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // console.info('Table', tableData);
  // console.info('table', table);
  // console.info('dataFiltered', dataFiltered);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="이상탐지 알람"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: '이상탐지 알람', href: paths.dashboard.anomalyAlarm.root },
            { name: '목록' },
          ]}
          action={
            <>
              <Button
                component={RouterLink}
                href={paths.dashboard.anomalyAlarm.analytics} 
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                통계 보러가기
              </Button>
            </>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          <Tabs
            value={filters.detection}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {CSP_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.csp) && 'filled') || 'soft'
                    }
                    color={
                      (tab.value === 'Time' && 'success') ||
                      (tab.value === 'IP' && 'warning') ||
                      (tab.value === 'Time,IP' && 'info') ||
                      'default'
                    }
                  >
                    {tab.value === 'all' && _AnomalyAlarmList.length}
                    {tab.value === 'Time' &&
                      _AnomalyAlarmList.filter((alarm) => alarm.detection === 'Time').length}
                    {tab.value === 'IP' &&
                      _AnomalyAlarmList.filter((alarm) => alarm.detection === 'IP').length}
                    {tab.value === 'Time,IP' &&
                      _AnomalyAlarmList.filter((alarm) => alarm.detection === 'Time,IP').length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <AWSTableToolbar
          // 검색창임
            filters={filters}
            onFilters={handleFilters}
            FilterOptions={_anomaly_cloumn}
          />

          {canReset && (
            <AWSTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

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
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  // headLabel={TABLE_HEAD}
                  headLabel={TABLE_HEAD.map((head) => ({
                    ...head,
                    style: { whiteSpace: 'nowrap' } // 여기에 스타일 속성 추가
                  }))}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  // 이 부분이 테이블 head의 체크박스임
                  // onSelectAllRows={(checked) =>
                  //   table.onSelectAllRows(
                  //     checked,
                  //     tableData.map((row) => row.id)
                  //   )
                  // }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <AnomalyTableRow
                        key={row.id}
                        row={{
                          // 테이블 컬럼들 순서대로 작성하면 됨
                          useridentity_username: row.useridentity_username,
                          // groups: row.Groups.join(', '),
                          // isMfaEnabled: row.isMfaEnabled ? 'Yes' : 'No',
                          eventname: row.eventname,
                          eventsource: row.eventsource.split('.')[0],
                          csp: row.csp,
                          // ip가 이상치인 경우만 뜨게 수정
                          // ip: row.unique_sourceipaddress.join(', '),
                          ip: row.detection.includes('IP') ? row.unique_sourceipaddress.join(', ') : '-',
                          // 시간이 00~00가 되도록 수정
                          time: row.detection.includes('Time') ? (
                            <div style={{ textAlign: 'center' }}>
                              {row.hourly_eventtime} <br /> ~ <br /> {row.latest_time.replace('T', ' ').replace('Z', '')}
                            </div>
                          ) : '-',
                          count: row.count,
                        }}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => {
                          table.onSelectRow(row.id);
                          dispatch(SELECT_POSITION(row));
                        }}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        // onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
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
        </Card>
      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { inputeventname, detection, column} = filters;

  if (inputeventname) {
    if (column === "사용자") {
      inputData = inputData.filter((alarm) =>
      alarm.useridentity_username.toLowerCase().includes(inputeventname.toLowerCase()) 
    );
    } else if (column === "사용한 api 권한"){
      inputData = inputData.filter((alarm) =>
        alarm.eventname.toLowerCase().includes(inputeventname.toLowerCase())
      );
    } else if (column === "이벤트소스"){
      inputData = inputData.filter((alarm) =>
        alarm.eventsource.toLowerCase().includes(inputeventname.toLowerCase())
      );
    } else if (column === "csp"){
      inputData = inputData.filter((alarm) =>
        alarm.csp.toLowerCase().includes(inputeventname.toLowerCase())
      );
    } else if (column === "ip"){
      inputData = inputData.filter((alarm) =>
        alarm.unique_sourceipaddress.some((ip) => ip.toLowerCase().includes(inputeventname.toLowerCase()))
      );
    } else if (column === "개수"){
      inputData = inputData.filter((alarm) =>
        alarm.count.toLowerCase().includes(inputeventname.toLowerCase())
      );
    }
    else{
    console.log(filters);
    inputData = inputData.filter((alarm) =>
      alarm.eventname.toLowerCase().includes(inputeventname.toLowerCase()) ||
      alarm.useridentity_username.toLowerCase().includes(inputeventname.toLowerCase()) ||
      alarm.eventsource.toLowerCase().includes(inputeventname.toLowerCase()) ||
      alarm.csp.toLowerCase().includes(inputeventname.toLowerCase()) ||
      alarm.unique_sourceipaddress.some((ip) => ip.toLowerCase().includes(inputeventname.toLowerCase()))
    );
  }
  }

  if (detection !== 'all') {
    inputData = inputData.filter((user) => user.detection === detection);
  }

  // if (positionName && typeof positionName === 'string') {
  //   inputData = inputData.filter(
  //     (user) => user.positionName.toLowerCase().indexOf(positionName.toLowerCase()) !== -1
  //   );
  // }

  return inputData;
}
