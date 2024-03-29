import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { useState, useCallback, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
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

import { _roles, _userList, USER_CSP_OPTIONS } from 'src/_mock';
import { setAwsExceptionUser, setGcpExceptionUser } from 'src/_mock/_log';
import { DepartmentDetailData } from 'src/_mock/_department';

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

import UserTableRow from '../group-user-table-row';
import UserTableToolbar from '../group-table-toolbar';
import UserTableFiltersResult from '../group-table-filters-result';



// ----------------------------------------------------------------------

const CSP_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_CSP_OPTIONS];

const TABLE_HEAD = [
  { id: 'fullName', label: '이름', width: 180 },
  { id: 'department', label: '부서', width: 200 },
  { id: 'duty', label: '직책', width: 200 },
  { id: 'csp', label: 'CSP', width: 180 },
  { id: 'group', label: '그룹', width: 180 },
  { id: 'position', label: '직무', width: 200 },
  { id: 'lastLoginTime', label: '최근 접속', width: 200 },
  { id: 'isMfaEnabled', label: 'MFA 연동 여부', width: 200 },
  { id: '', width: 88 },
];

const defaultFilters = {
  name: '',
  role: [],
  csp: 'all',
};

// ----------------------------------------------------------------------

export default function GroupUserListView() {

  const { departmentName } = useParams();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchDepartmentDetailData = async () => {
      try {
        const data = await DepartmentDetailData(departmentName);
        setTableData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDepartmentDetailData();
  }, [departmentName]);

  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  // const [tableData, setTableData] = useState(DepartmentDetailData);

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

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('csp', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // Aws API 연결
  const handleExcludeAwsUser = useCallback(() => {
    // 최소한 하나의 사용자가 선택되었는지 확인
    if (table.selected.length === 0) {
      // 사용자가 선택되지 않은 경우 처리
      return;
    }

    // 선택된 사용자의 사용자 이름 추출
    const selectedAwsUserNames = table.selected.map((userId) => {
      const awsUser = tableData.find((row) => row.id === userId);
      return awsUser ? awsUser.userName : null;
    });

    // null 값 제거 (사용자를 찾을 수 없는 경우)
    const validAwsUserNames = selectedAwsUserNames.filter((userName) => userName !== null);

    // API 함수를 호출하여 사용자를 최적화에서 제외
    setAwsExceptionUser(validAwsUserNames);

    // 확인 대화 상자 닫기
    confirm.onFalse();
  }, [table.selected, tableData, confirm]);

  // Gcp API 연결
    const handleExcludeGcpUser = useCallback(() => {
    // 최소한 하나의 사용자가 선택되었는지 확인
    if (table.selected.length === 0) {
      // 사용자가 선택되지 않은 경우 처리
      return;
    }

    // 선택된 사용자의 사용자 이름 추출
    const selectedGcpUserNames = table.selected.map((userId) => {
      const gcpUser = tableData.find((row) => row.id === userId);
      return gcpUser ? gcpUser.userName : null;
    });

    // null 값 제거 (사용자를 찾을 수 없는 경우)
    const validGcpUserNames = selectedGcpUserNames.filter((userName) => userName !== null);

    // API 함수를 호출하여 사용자를 최적화에서 제외
    setGcpExceptionUser(validGcpUserNames);

    // 확인 대화 상자 닫기
    confirm.onFalse();
  }, [table.selected, tableData, confirm]);
  // const currentDepartment = _departmentList.find((department) => department.id === id);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="부서 내 사용자"
          links={[
            { name: 'Frontend', href: paths.dashboard.root },
            { name: '사용자', href: paths.dashboard.user.root },
            { name: '목록' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.user.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New User
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          <Tabs
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
                    {tab.value === 'AWS' &&
                      _userList.filter((user) => user.csp === 'AWS').length}
                    {tab.value === 'GCP' &&
                      _userList.filter((user) => user.csp === 'GCP').length}
                    {tab.value === 'AWS,GCP' &&
                      _userList.filter((user) => user.csp === 'AWS,GCP').length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <UserTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            roleOptions={_roles}
          />

          {canReset && (
            <UserTableFiltersResult
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
                <Tooltip title="임시 계정 생성">
  <IconButton color="primary" onClick={confirm.onTrue}>
    <Iconify icon="mdi:plus" />
  </IconButton>
</Tooltip>

                <Tooltip title="출장">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="mdi:briefcase-outline" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="휴직">
  <IconButton color="primary" onClick={confirm.onTrue}>
    <Iconify icon="mdi:pause-circle-outline" />
  </IconButton>
</Tooltip>
 <Tooltip title="퇴사">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>

                 <Tooltip title="최적화 대상에서 제외하기">
                    <IconButton color="primary" onClick={confirm.onTrue}>
                      <Iconify icon="icon-park-outline:attention" />
                    </IconButton>
                  </Tooltip>
                  </Stack>
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
                      <UserTableRow
                        key={row.id}
                        row={{
                          fullName: row.fullName,
                          department: row.department,
                          duty: row.duty,
                          csp: row.csp,
                          attachedGroup: row.attachedGroup,
                          attachedPosition: row.attachedPosition.join(', '),
                          lastLoginTime: row.lastLoginTime,
                          isMfaEnabled: row.isMfaEnabled,
                          isImportantPerson: row.isImportantPerson,
                          awsName: row.awsAccount ? row.awsAccount.userName : '',
                          awsUsedKeys: row.awsAccount && row.awsAccount.usedKeys ? row.awsAccount.usedKeys.map(key => `${key.keyId} (Created: ${key.createDate}, Expires: ${key.expirationDate})`).join(', ') : '',
                          awsManagedKeys: row.awsAccount && row.awsAccount.managedKeys ? row.awsAccount.managedKeys.map(key => `${key.keyId} (Created: ${key.createDate}, Expires: ${key.expirationDate})`).join(', ') : '',
                          gcpAccount: row.gcpAccount,
                          device: row.device,
                          description: row.description,
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

          <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="최적화 대상에서 제외하기"
        content={
          <>
            <strong> {table.selected.length} </strong> 개의 계정이 최적화 대상에서 제외됩니다.
          </>
        }
        action={
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        // AWS 사용자 여부 확인
        const isAwsUser = table.selected.some(userId => {
          const user = _userList.find(u => u.id === userId);
          return user && user.csp === 'AWS';
        });

        // GCP 사용자 여부 확인
        const isGcpUser = table.selected.some(userId => {
          const user = _userList.find(u => u.id === userId);
          return user && user.csp === 'GCP';
        });

        if (isAwsUser) {
          handleExcludeAwsUser();
        } else if (isGcpUser) {
          handleExcludeGcpUser();
        }

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

// GroupUserListView.propTypes = {
//   id: PropTypes.string,
// };
