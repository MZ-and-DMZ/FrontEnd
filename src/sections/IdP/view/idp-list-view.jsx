import isEqual from 'lodash/isEqual';

import { useState, useCallback, useRef } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _AwsUserList,  _IdPGroupsList, _IdPUsersList, _IdPClientsList, _IdPRolesList, IdP_OPTIONS} from 'src/_mock';

import Label from 'src/components/label';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
} from 'src/components/table';

import IDPTable from '../idp-table';

// ----------------------------------------------------------------------

const IDP_OPTIONS = [...IdP_OPTIONS];

const Groups_TABLE_HEAD = [
  { id: 'name', label: '부서명', flex: 1},
  { id: 'members', label: '인원', flex: 1 },
  { id: 'num', label: '인원수', flex: 1 },
  { id: 'client_roles', label: '역할', flex: 1 },
  { id: '', width: 40 },
];
const Users_TABLE_HEAD = [
  { id: 'name', label: '이름', flex: 1 },
  { id: 'groups', label: '부서', flex: 1 },
  { id: 'roles', label: '역할', flex: 1 },
  { id: '', width: 40 },
];
const Clients_TABLE_HEAD = [
  { id: 'name', label: '클라이언트명', flex: 1 },
  { id: 'rootUrl', label: 'rootURL', flex: 1 },
  { id: 'baseUrl', label: 'baseURL', flex: 1 },
  { id: 'protocol', label: '프로토콜', flex: 1 },
  { id: '', width: 40 },
];
const Roles_TABLE_HEAD = [
  { id: 'name', label: '이름', flex: 1 },
  { id: 'type', label: '종류', flex: 1 },
  { id: 'client', label: '설명', flex: 1 },
  { id: '', width: 40 },
];

const defaultFilters = {
  tab: 'Groups',
};

// ----------------------------------------------------------------------

export default function IDPListView() {
  const table = useTable();

  const settings = useSettingsContext();

  // 기본으로 groups를 받고, tab 설정에 따라 set해서 다른 api가져오면 될듯?
  const [tableData, setTableData] = useState(_IdPGroupsList);
  console.log(tableData);

  const groupsColumns = [
    // {
    //   field: 'id',
    // },
    {
      field: 'name',
      headerName: '부서명',
      flex: 1,
      editable: true,
    },
    {
      field: 'members',
      headerName: '인원',
      flex: 1,
      editable: true,
    },
    {
      field: 'num',
      headerName: '인원수',
      flex: 1,
      editable: true,
    },
    {
      field: 'client_roles',
      headerName: '역할',
      flex: 1,
      editable: true,
    },
  ];

  const usersColumns = [
    // {
    //   field: 'id',
    // },
    {
      field: 'name',
      // headerName: '그룹명',
      flex: 1,
      editable: true,
    },
    {
      field: 'groups',
      // headerName: '인원',
      flex: 1,
      editable: true,
    },
    {
      field: 'roles',
      // headerName: '역할',
      flex: 1,
      editable: true,
    },
  ];
  const clientsColumns = [
    // {
    //   field: 'id',
    // },
    {
      field: 'name',
      flex: 1,
      editable: true,
    },
    {
      field: 'rootUrl',
      flex: 1,
      editable: true,
    },
    {
      field: 'baseUrl',
      flex: 1,
      editable: true,
    },
    {
      field: 'protocol',
      flex: 1,
      editable: true,
    },
  ];
  const rolesColumns = [
    // {
    //   field: 'id',
    // },
    {
      field: 'name',
      flex: 1,
      editable: true,
    },
    {
      field: 'type',
      flex: 1,
      editable: true,
    },
    {
      field: 'client',
      flex: 1,
      editable: true,
    },
  ];

  const [filters, setFilters] = useState(defaultFilters);

  const tabTable = useRef("Groups");
  console.log(tabTable.current);

  // tab 변경 시 테이블에 보여주는 정보 수정
  const handleFilters = useCallback(
    (tab, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [tab]: value,
      }));
      if (value === "Users"){
        tabTable.current = "Users";
        setTableData(_IdPUsersList);
      }
      else if (value === "Groups"){
        tabTable.current = "Groups";
        setTableData(_IdPGroupsList);
      }
      else if (value === "Clients"){
        tabTable.current = "Clients";
        setTableData(_IdPClientsList);
      }
      else if (value === "Roles"){
        tabTable.current = "Roles";
        setTableData(_IdPRolesList);
      }
    },
    [table]
  );


  const handleTabChange = useCallback(
    (event, newValue) => {
      handleFilters('tab', newValue);
    },
    [handleFilters]
  );


  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="사용자"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'IdP', href: paths.dashboard.idp.root },
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
          <Tabs
            value={filters.tab}
            onChange={handleTabChange}
            sx={{
              px: 2.5,
              boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {IDP_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                  variant={
                    ((tab.value === 'Groups'|| tab.value === tabTable) && 'filled') || 'soft'
                  }
                  color={
                    (tab.value === 'Users' && 'success') ||
                    (tab.value === 'Clients' && 'warning') ||
                    (tab.value === 'Roles' && 'info') ||
                    'default'
                  }
                  >
                  {tab.value === 'Groups' && _IdPGroupsList.length}
                  {tab.value === 'Users' &&
                    _IdPUsersList.length}
                  {tab.value === 'Clients' &&
                    _IdPClientsList.length}
                  {tab.value === 'Roles' &&
                    _IdPRolesList.length}
                  </Label>
                }
              />
            ))}
          </Tabs>

            {tabTable.current === "Groups" && <IDPTable data={tableData} TABLE_HEAD={Groups_TABLE_HEAD} columns={groupsColumns} />}
            {tabTable.current === "Users" && <IDPTable data={tableData} TABLE_HEAD={Users_TABLE_HEAD} columns={usersColumns} />}
            {tabTable.current === "Clients" && <IDPTable data={tableData} TABLE_HEAD={Clients_TABLE_HEAD} columns={clientsColumns} />}
            {tabTable.current === "Roles" && <IDPTable data={tableData} TABLE_HEAD={Roles_TABLE_HEAD} columns={rolesColumns} />}
              
        </Card>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { name, csp, positionName, tab } = filters;

  return inputData;
}
