import sumBy from 'lodash/sumBy';
import { useState, useCallback, useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import RestoreIcon from '@mui/icons-material/Restore';

import { alpha, useTheme } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { fTimestamp } from 'src/utils/format-time';

import { INVOICE_SERVICE_OPTIONS } from 'src/_mock';
import { parseLoggingList, restoreUser } from 'src/_mock/_log';

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

import InvoiceAnalytic from '../invoice-analytic';
import InvoiceTableRow from '../invoice-table-row';
import InvoiceTableToolbar from '../invoice-table-toolbar';
import InvoiceTableFiltersResult from '../invoice-table-filters-result';
// import { handleRestoreSelectedUsers } from '../invoice-table-row'; 


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'userName', label: '사용자 이름' },
  { id: 'csp', label: 'CSP'},
  { id: 'date', label: 'date' },
  { id: 'version', label: '버전 정보' },
  { id: 'actionCount', label: '할당된 권한', width: 300 },
  // { id: 'status', label: 'status' },
  // { id: '' },
];

const defaultFilters = {
  userName: '',
  service: [],
  status: 'all',
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function InvoiceListView() {
  const theme = useTheme();

  const settings = useSettingsContext();

  const router = useRouter();

  const table = useTable({ defaultOrderBy: 'createDate' });

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(parseLoggingList);

  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await parseLoggingList();
      setTableData(data);
    } catch (error) {
      console.error('로그 데이터를 가져오고 구문 분석하는 동안 오류 발생:', error);
      // 에러 처리 로직을 추가할 수 있습니다.
    }
  };

  fetchData();
}, []);


  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
      : false;

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    dateError,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 56 : 76;

  const canReset =
    !!filters.userName ||
    !!filters.service.length ||
    filters.status !== 'all' ||
    (!!filters.startDate && !!filters.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const getInvoiceLength = (status) => {
  if (Array.isArray(tableData)) {
    return tableData.filter((item) => item.status === status).length;
  }
  return 0; // 혹은 원하는 기본값
};


const getTotalAmount = (status) => {
  if (Array.isArray(tableData)) {
    return sumBy(
      tableData.filter((item) => item.status === status),
      'totalAmount'
    );
  }
  return 0; // 혹은 원하는 기본값
};

  const getPercentByStatus = (status) => (getInvoiceLength(status) / tableData.length) * 100;

  const TABS = [
    { value: 'all', label: 'All', color: 'default', count: tableData.length },
    {
      value: 'paid',
      label: '정상 권한',
      color: 'success',
      count: getInvoiceLength('paid'),
    },
    {
      value: 'pending',
      label: '갱신 대상',
      color: 'warning',
      count: getInvoiceLength('pending'),
    },
    {
      value: 'overdue',
      label: '초과 권한',
      color: 'error',
      count: getInvoiceLength('overdue'),
    },
    // {
    //   value: 'draft',
    //   label: 'Draft',
    //   color: 'default',
    //   count: getInvoiceLength('draft'),
    // },
  ];

  const handleFilters = useCallback(
    (userName, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [userName]: value,
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
      router.push(paths.dashboard.invoice.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.invoice.details(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleRestoreSelectedUsers = async () => {
    // Ensure table.selected is an array
    if (!Array.isArray(table.selected) || table.selected.length === 0) {
      console.warn('No users selected for restoration.');
      return;
    }

    const selectedUsersData = table.selected.map((selectedId) => {
      const selectedUser = tableData.find((row) => row.id === selectedId);
      return {
        userName: selectedUser.userName,
        version: selectedUser.version,
      };
    });

    // Call the restoreUser function with selected users
    await restoreUser(selectedUsersData);

    // Clear the selected users after restoration
    table.onResetSelectedRows();
  };

  // useEffect를 사용하여 selectedUsers 상태가 변경될 때마다 호출
  useEffect(() => {
    const restoreData = async () => {
      try {
        // Call the restoreUser function with selected users
        await restoreUser(selectedUsers);
        console.log('복구 성공');

        // Clear the selected users after restoration
        setSelectedUsers([]);
      } catch (error) {
        console.error('사용자 복구 중 오류 발생:', error);
        // Handle error (e.g., show error message)
      }
    };

    // selectedUsers가 변경될 때마다 복구 함수 호출
    if (selectedUsers.length > 0) {
      restoreData();
    }
  }, [selectedUsers]);



  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="권한 최적화"
          links={[
            {
              name: 'Dashboard',
              href: paths.dashboard.root,
            },
            {
              name: '권한 최적화',
              href: paths.dashboard.invoice.root,
            },
            {
              name: '목록',
            },
          ]}
          action={
            <Button
  variant="contained"
  color="primary"
  onClick={confirm.onTrue}
  disabled={table.selected.length === 0}
  type="button"  // 이 부분을 추가
>
  복구하기
</Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

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
                total={tableData.length}
                percent={100}
                price={sumBy(tableData, 'totalAmount')}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />

              <InvoiceAnalytic
                title="적정 권한"
                total={getInvoiceLength('paid')}
                percent={getPercentByStatus('paid')}
                price={getTotalAmount('paid')}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />

              <InvoiceAnalytic
                title="갱신 대상"
                total={getInvoiceLength('pending')}
                percent={getPercentByStatus('pending')}
                price={getTotalAmount('pending')}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              />

              <InvoiceAnalytic
                title="초과 권한"
                total={getInvoiceLength('overdue')}
                percent={getPercentByStatus('overdue')}
                price={getTotalAmount('overdue')}
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

        <Card>
          <Tabs
            value={filters.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                iconPosition="end"
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
                    }
                    color={tab.color}
                  >
                    {tab.count}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <InvoiceTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            dateError={dateError}
            serviceOptions={INVOICE_SERVICE_OPTIONS.map((option) => option.userName)}
          />

          {canReset && (
            <InvoiceTableFiltersResult
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
                <Stack direction="row">
                  <Tooltip title="복구하기">
                    <IconButton color="primary" onClick={confirm.onTrue}>
                      <Iconify icon="ic:baseline-restore" />
                    </IconButton>
                  </Tooltip>

                  {/* <Tooltip title="Download">
                    <IconButton color="primary">
                      <Iconify icon="eva:download-outline" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Print">
                    <IconButton color="primary">
                      <Iconify icon="solar:printer-minimalistic-bold" />
                    </IconButton>
                  </Tooltip> */}

                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={confirm.onTrue}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
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
                      <InvoiceTableRow
                        key={row.id}
                        row={{
                          userName: row.userName,
                          csp: row.csp,
                          date: row.date,
                          version: row.version,
                          actionCount: row.actionCount,
                          actionList: row.actionList,
                          // status: row.status
                        }}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
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
                          
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="복구 알림"
        content={
          <>
            <strong> {table.selected.length} </strong> 개 계정이 성공적으로 복구될 예정입니다.
          </>
        }
        action={
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleRestoreSelectedUsers(table.selected)
              confirm.onFalse();
              window.location.reload();
            }}
          >
            확인
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { userName, status, service, startDate, endDate } = filters;
  inputData = Array.from(inputData);
  console.log('Original inputData:', inputData);


  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (userName) {
    inputData = inputData.filter(
      (item) =>
        item.userName.toLowerCase().indexOf(userName.toLowerCase()) !== -1 
        // invoice.invoiceTo.userName.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((invoice) => invoice.status === status);
  }

  if (service.length) {
    inputData = inputData.filter((invoice) =>
      invoice.items.some((filterItem) => service.includes(filterItem.service))
    );
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter(
        (invoice) =>
          fTimestamp(invoice.date) >= fTimestamp(startDate) &&
          fTimestamp(invoice.date) <= fTimestamp(endDate)
      );
    }
  }

  console.log('Filtered inputData:', inputData);

  return inputData;
}
