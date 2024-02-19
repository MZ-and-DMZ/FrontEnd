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

import { _AwsUserList, POSITION_CSP_OPTIONS , AWS_OPTIONS} from 'src/_mock';

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

import AWSTableRow from '../anomaly-table-row';
import AWSTableToolbar from '../anomaly-table-toolbar';
import AWSTableFiltersResult from '../anomaly-table-filters-result';

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

export default function AnomalyAlarmListView() {
  const table = useTable();

  const dispatch = useDispatch();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(_AwsUserList);

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
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  // const handleSearch = (event) => {
  //   const query = event.target.value.toLowerCase();
  //   setSearchQuery(query);

  //   const filteredServices = awsServiceList.filter((service) =>
  //     service.actionCrudName.toLowerCase().includes(query)
  //   );

  //   setFilteredServiceList(filteredServices);
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

  // const handleFilterCSP = useCallback(
  //   (event, newValue) => {
  //     handleFilters('csp', newValue);
  //   },
  //   [handleFilters]
  // );

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
              {/* <Button
                component={RouterLink}
                href={paths.dashboard.aws.new} 
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                New AWS User
              </Button> */}
            </>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          {/* <Tabs
            // value={filters.csp}
            // onChange={handleFilterCSP}
            sx={{
              px: 2.5,
              boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {AWS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' ) && 'filled') || 'soft'
                    }
                    color={
                      (tab.value === 'aws' && 'success') ||
                      'default'
                    }
                  >
                    {_AwsUserList.length}
                  </Label>
                }
              />
            ))}
          </Tabs> */}

          <AWSTableToolbar
          // 검색창임
            filters={filters}
            onFilters={handleFilters}
            positionNameOptions={_AwsUserList.map((user) => user.Groups)}
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
                      <AWSTableRow
                        key={row.id}
                        row={{
                          // 테이블 컬럼들 순서대로 작성하면 됨
                          name: row.UserName,
                          groups: row.Groups.join(', '),
                          isMfaEnabled: row.isMfaEnabled ? 'Yes' : 'No',
                          AttachedPolicies: row.AttachedPolicies.join(', '),
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
  const { name} = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);


  console.log(name)
  if (name && name.userName !== undefined) {
    console.log(name.userName);
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }
  
  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  // if (csp !== 'all') {
  //   inputData = inputData.filter((user) => user.csp === csp);
  // }

  // if (positionName && typeof positionName === 'string') {
  //   inputData = inputData.filter(
  //     (user) => user.positionName.toLowerCase().indexOf(positionName.toLowerCase()) !== -1
  //   );
  // }

  return inputData;
}
