import sumBy from 'lodash/sumBy';
import isEqual from 'lodash/isEqual';
import { useState, useCallback, useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { alpha, useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { _roles, _userList, USER_CSP_OPTIONS } from 'src/_mock';

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

import InvoiceAnalytic from 'src/sections/optimize/invoice-analytic';

import { _departmentList } from 'src/_mock/_department';

import GroupTableRow from '../group-table-row';
import GroupTableToolbar from '../group-table-toolbar';
import GroupTableFiltersResult from '../group-table-filters-result';

// ----------------------------------------------------------------------

const CSP_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_CSP_OPTIONS];

const TABLE_HEAD = [
  { id: 'departmentName', label: '부서명', width: 180 },
  // { id: 'csp', label: 'CSP', width: 180 },
  { id: 'awsRole', label: 'AWS 역할', width: 220 },
  { id: 'gcpRole', label: 'GCP 역할', width: 500 },
  { id: 'adGpo', label: 'AD 그룹 정책', width: 400 },
  { id: 'keycloakRole', label: 'KeyCloak 역할', width: 400 },
  { id: '', width: 88 },
];

const defaultFilters = {
  name: '',
  role: [],
  csp: 'all',
};


const TABS = [
  { value: 'all', label: 'All', color: 'default', },
  {
    value: 'paid',
    label: '정상 권한',
    color: 'success',
    count: '29',
  },
  {
    value: 'pending',
    label: '갱신 대상',
    color: 'warning',
    count: '5',
  },
  {
    value: 'overdue',
    label: '초과 권한',
    color: 'error',
    count: '0',
  },
  // {
  //   value: 'draft',
  //   label: 'Draft',
  //   color: 'default',
  //   count: getInvoiceLength('draft'),
  // },
];

// ----------------------------------------------------------------------

export default function GroupListView() {
  const table = useTable();

  const theme = useTheme();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(_departmentList);


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

  const denseHeight = table.dense ? 52 : 72;

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

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.user.edit(id));
    },
    [router]
  );

  // const handleFilterStatus = useCallback(
  //   (event, newValue) => {
  //     handleFilters('csp', newValue);
  //   },
  //   [handleFilters]
  // );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);



  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="부서별 권한 정보"
          links={[
            { name: 'home', href: paths.dashboard.root },
            { name: '부서', href: paths.dashboard.user.root },
            { name: '목록' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.user.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              새로운 부서 추가하기
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
        <Card
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        >
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <InvoiceAnalytic
                title="전체 사용자 수"
                total='130'
                percent={100}
                // price='120'
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />

              <InvoiceAnalytic
                title="적정 권한"
                total='115'
                percent='100'
                // price='120'
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />

              <InvoiceAnalytic
                title="갱신 대상"
                total='15'
                percent='100'
                // price='120'
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              />

              <InvoiceAnalytic
                title="초과 권한"
                total='0'
                percent='100'
                // price='120'
                icon="solar:bell-bing-bold-duotone"
                color={theme.palette.error.main}
              />

              {/* <InvoiceAnalytic
                title="Draft"
                total={getInvoiceLength('draft')}
                percent={getPercentByStatus('draft')}
                price={getTotalAmount('draft')}
                icon="solar:file-corrupted-bold-duotone"
                color={theme.palette.text.secondary}
              /> */}
            </Stack>
          </Scrollbar>
        </Card>
          {/* <Tabs
            value={filters.csp}
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
                      (tab.value === 'AWS' && 'success') ||
                      (tab.value === 'GCP' && 'warning') ||
                      (tab.value === 'AWS,GCP' && 'info') ||
                      'default'
                    }
                  >
                    {tab.value === 'all' && _userList.length}
                    {tab.value === 'AWS' && _userList.filter((user) => user.csp === 'AWS').length}
                    {tab.value === 'GCP' && _userList.filter((user) => user.csp === 'GCP').length}
                    {tab.value === 'AWS,GCP' &&
                      _userList.filter((user) => user.csp === 'AWS,GCP').length}
                  </Label>
                }
              />
            ))}
          </Tabs> */}

          <GroupTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            roleOptions={_roles}
          />

          {canReset && (
            <GroupTableFiltersResult
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
                      <GroupTableRow
                        key={row.id}
                        row={{
                          departmentName: row.departmentName,
                          awsRole: row.awsRole,
                          gcpRole: row.gcpRole,
                          adGpo: row.adGpo,
                          keyCloakRole: row.keyCloakRole,
                        }}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
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
  const { name, csp, role } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (csp !== 'all') {
    inputData = inputData.filter((user) => user.csp === csp);
  }

  if (role.length) {
    inputData = inputData.filter((user) => role.includes(user.role));
  }

  return inputData;
}
