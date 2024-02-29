import isEqual from 'lodash/isEqual';

import { useState, useCallback, useRef } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _AwsUserList,  _ADGroupsList, _ADUsersList, AD_OPTIONS} from 'src/_mock';

import Label from 'src/components/label';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
} from 'src/components/table';

import ADTable from '../ad-table';

// ----------------------------------------------------------------------

const IDP_OPTIONS = [...AD_OPTIONS];

const Groups_TABLE_HEAD = [
  { id: 'name', label: '부서명', flex: 1},
  { id: 'member', label: '인원', flex: 1 },
  { id: 'num', label: '인원수', flex: 1 },
  { id: 'description', label: '설명', flex: 1 },
  { id: 'whenChanged', label: '변경 날짜', flex: 1 },
  { id: '', width: 40 },
];
const Users_TABLE_HEAD = [
  { id: 'name', label: '이름', flex: 1 },
  { id: 'title', label: '직위', flex: 1 },
  { id: 'mail', label: '메일', flex: 1 },
  // { id: 'lastLogon', label: '마지막 로그인 시간', flex: 1 },
  // { id: 'lastLogoff', label: '마지막 로그아웃 시간', flex: 1 },
  // { id: 'pwdLastSet', label: '비밀번호 마지막 설정 날짜', flex: 1 },
  { id: '', width: 40 },
];

const defaultFilters = {
  tab: 'Groups',
};

// ----------------------------------------------------------------------

export default function WindowADListView() {
  const table = useTable();

  const settings = useSettingsContext();

  // 기본으로 groups를 받고, tab 설정에 따라 set해서 다른 api가져오면 될듯?
  const [tableData, setTableData] = useState(_ADGroupsList);

  const groupsColumns = [
    // {
    //   field: 'id',
    // },
    {
      field: 'name',
      flex: 1,
      editable: true,
    },
    {
      field: 'member',
      flex: 1,
      editable: true,
    },
    {
      field: 'num',
      flex: 1,
      editable: true,
    },
    {
      field: 'description',
      flex: 1,
      editable: true,
    },
    {
      field: 'whenChanged',
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
      flex: 1,
      editable: true,
    },
    {
      field: 'title',
      flex: 1,
      editable: true,
    },
    {
      field: 'mail',
      flex: 1,
      editable: true,
    },
    // {
    //   field: 'lastLogon',
    //   flex: 1,
    //   editable: true,
    // },
    // {
    //   field: 'lastLogoff',
    //   flex: 1,
    //   editable: true,
    // },
    // {
    //   field: 'pwdLastSet',
    //   flex: 1,
    //   editable: true,
    // },
  ];

  const [filters, setFilters] = useState(defaultFilters);

  const tabTable = useRef("Groups");

  // tab 변경 시 테이블에 보여주는 정보 수정
  const handleFilters = useCallback(
    (tab, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [tab]: value,
      }));
      if (value === "Groups"){
        tabTable.current = "Groups";
        setTableData(_ADGroupsList);
      }
      else if (value === "Users"){
        tabTable.current = "Users";
        setTableData(_ADUsersList);
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
            { name: 'Window AD', href: paths.dashboard.ad.root },
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
                    'default'
                  }
                  >
                  {tab.value === 'Groups' && _ADGroupsList.length}
                  {tab.value === 'Users' &&
                    _ADUsersList.length}
                  </Label>
                }
              />
            ))}
          </Tabs>

            {tabTable.current === "Groups" && <ADTable data={tableData} TABLE_HEAD={Groups_TABLE_HEAD} columns={groupsColumns} />}
            {tabTable.current === "Users" && <ADTable data={tableData} TABLE_HEAD={Users_TABLE_HEAD} columns={usersColumns} />}
              
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
