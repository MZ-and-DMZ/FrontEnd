import React, { useState, useEffect } from 'react';

import {
  FormControl, InputLabel, Select, MenuItem, Chip, Input, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button,
  TextField, InputAdornment, Box, TablePagination, Checkbox
} from '@mui/material';

import styled from '@emotion/styled';

import { getAwsServiceList, getActionCrudData, _parseActionCrudData } from 'src/_mock/_aws';

const RootContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: (theme) => theme.spacing(2),
});

const StyledFormControl = styled(FormControl)({
  minWidth: 120,
});

const StyledChip = styled(Chip)(({ theme, permissionType }) => {
  const backgroundColor = (() => {
    switch (permissionType) {
      case 'read':
        return theme.palette.success.main;
      case 'create':
        return theme.palette.warning.main;
      case 'update':
        return theme.palette.info.main;
      case 'delete':
        return theme.palette.error.main;
      default:
        return theme.palette.grey.main;
    }
  })();

  const color =
    permissionType === 'delete'
      ? theme.palette.getContrastText(theme.palette.error.main)
      : theme.palette.common.white;

  return {
    margin: theme.spacing(0.5),
    backgroundColor,
    color,
  };
});


const TableWrapper = styled(Box)({
  marginTop: (theme) => theme.spacing(2),
});

const SecondCreateForm = () => {
  const [awsServiceList, setAwsServiceList] = useState([]);
  const [filteredServiceList, setFilteredServiceList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [menuList, setMenuList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMenuQuery, setSearchMenuQuery] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('');
  const [selectedCrudType, setSelectedCrudType] = useState('');
  const [parsedData, setParsedData] = useState([]);
  const [selectedMenuData, setSelectedMenuData] = useState(null);
  const [readPermissionChecked, setReadPermissionChecked] = useState(false);
  const [createPermissionChecked, setCreatePermissionChecked] = useState(false);
  const [updatePermissionChecked, setUpdatePermissionChecked] = useState(false);
  const [deletePermissionChecked, setDeletePermissionChecked] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState({
    create: [],
    read: [],
    update: [],
    delete: [],
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const middleClassification = await getActionCrudData();
        const parsedDataResult = _parseActionCrudData(middleClassification);

        setAwsServiceList(parsedDataResult);
        setFilteredServiceList(parsedDataResult);
        setParsedData(parsedDataResult);
      } catch (error) {
        console.error('AWS 서비스 목록을 불러오는 동안 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const selectedService = awsServiceList.find((service) => service.actionCrudName === selectedCategory);
      setMenuList(selectedService?.menuList || []);
    }
  }, [selectedCategory, awsServiceList]);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setSelectedCrudType('');
    setSelectedSubCategory(menu); 
    setSelectedPermissions({
      create: [],
      read: [],
      update: [],
      delete: [],
    });
  };

  const handleServiceClick = async (selectedService) => {
    setSelectedCategory(selectedService);

    try {
      const selectedServiceData = parsedData.find((service) => service.actionCrudName === selectedService);
      const selectedServiceMenuList = selectedServiceData?.menuList || [];

      setSelectedSubCategory('');
      setMenuList(selectedServiceMenuList);
    } catch (error) {
      console.error('서비스 메뉴를 가져오는 동안 오류 발생:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredServices = awsServiceList.filter(
      (service) => service.actionCrudName.toLowerCase().includes(query)
    );

    setFilteredServiceList(filteredServices);
  };

  const handleServiceSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSelectedCategory('');
    setSearchQuery(query);

    const filteredServices = awsServiceList.filter(
      (service) => service.actionCrudName.toLowerCase().includes(query)
    );

    setFilteredServiceList(filteredServices);
  };

  const handleMenuSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchMenuQuery(query);

    const filteredMenus = menuList.filter(
      (menu) => menu.menu.toLowerCase().includes(query)
    );

    setMenuList(filteredMenus);
  };

  const handleRemovePermission = (removedPermission) => {
    // 선택된 CRUD 타입에 해당하는 권한 목록을 가져옴
    const updatedPermissions = { ...selectedPermissions };
    const crudTypePermissions = updatedPermissions[selectedCrudType];

    // 선택된 권한을 제거
    const updatedPermissionsAfterRemoval = crudTypePermissions.filter(
      (permission) => permission !== removedPermission
    );

    // 상태 업데이트
    setSelectedPermissions({
      ...updatedPermissions,
      [selectedCrudType]: updatedPermissionsAfterRemoval,
    });
  };

  const handleReadPermissionChange = (event) => {
    const isChecked = event.target.checked;

    // 읽기 권한 체크 여부 업데이트
    setReadPermissionChecked(isChecked);

    // 읽기 권한을 가져옴
    const menuData = menuList.find((menu) => menu.menu === selectedSubCategory);
    const readPermissions = menuData?.readPermissions || [];

    // 읽기 권한에 속한 모든 권한을 선택 여부에 따라 업데이트
    setSelectedPermissions((prevPermissions) => ({
      ...prevPermissions,
      read: isChecked ? readPermissions : [],
    }));

    // selectedMenuData 업데이트
    setSelectedMenuData(menuData);
  };

  const handleCreatePermissionChange = (event) => {
    const isChecked = event.target.checked;

    // 생성 권한 체크 여부 업데이트
    setCreatePermissionChecked(isChecked);

    // 생성 권한을 가져옴
    const menuData = menuList.find((menu) => menu.menu === selectedSubCategory);
    const createPermissions = menuData?.createPermissions || [];

    // 생성 권한에 속한 모든 권한을 선택 여부에 따라 업데이트
    setSelectedPermissions((prevPermissions) => ({
      ...prevPermissions,
      create: isChecked ? createPermissions : [],
    }));

    // selectedMenuData 업데이트
    setSelectedMenuData(menuData);
  };

  const handleUpdatePermissionChange = (event) => {
    const isChecked = event.target.checked;

    // 읽기 권한 체크 여부 업데이트
    setUpdatePermissionChecked(isChecked);

    // 읽기 권한을 가져옴
    const menuData = menuList.find((menu) => menu.menu === selectedSubCategory);
    const updatePermissions = menuData?.updatePermissions || [];

    // 읽기 권한에 속한 모든 권한을 선택 여부에 따라 업데이트
    setSelectedPermissions((prevPermissions) => ({
      ...prevPermissions,
      update: isChecked ? updatePermissions : [],
    }));

    // selectedMenuData 업데이트
    setSelectedMenuData(menuData);
  };

  const handleDeletePermissionChange = (event) => {
    const isChecked = event.target.checked;

    // 삭제 권한 체크 여부 업데이트
    setDeletePermissionChecked(isChecked);

    // 삭제 권한을 가져옴
    const menuData = menuList.find((menu) => menu.menu === selectedSubCategory);
    const deletePermissions = menuData?.deletePermissions || [];

    // 삭제 권한에 속한 모든 권한을 선택 여부에 따라 업데이트
    setSelectedPermissions((prevPermissions) => ({
      ...prevPermissions,
      delete: isChecked ? deletePermissions : [],
    }));

    // selectedMenuData 업데이트
    setSelectedMenuData(menuData);
  };
  

  return (
    <RootContainer>
      <StyledFormControl>
        <TextField
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search services..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                검색
              </InputAdornment>
            ),
          }}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>서비스 목록</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredServiceList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((service, index) => (
                  <TableRow key={index} selected={selectedCategory === service.actionCrudName}>
                    <TableCell>
                      <Button onClick={() => handleServiceClick(service.actionCrudName)}>
                        {service.actionCrudName}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredServiceList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </StyledFormControl>

      {selectedCategory && (
        <TableWrapper>
                  <TextField
          fullWidth
          value={searchMenuQuery}
          onChange={handleMenuSearch}
          placeholder="메뉴 검색..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                검색
              </InputAdornment>
            ),
          }}
        />
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>메뉴 목록</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menuList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((menu, index) => (
                    <TableRow key={index} selected={selectedSubCategory === menu.menu}>
                      <TableCell>
                        <Button onClick={() => handleMenuClick(menu.menu)}>
                          {menu.menu}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={menuList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </TableWrapper>
      )}

{selectedCategory && selectedSubCategory && (
  <TableWrapper>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
            <Checkbox
                  checked={createPermissionChecked}
                  onChange={handleCreatePermissionChange}
                />
                생성 권한</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
          {awsServiceList
  .find((service) => service.actionCrudName === selectedCategory)
  ?.menuList
  .filter((menu) => menu.menu === selectedSubCategory)
  .map((menu, index) => (
    <TableCell key={index}>
      {menu && menu.createPermissions.length > 0 ? (
        menu.createPermissions.map((permission, i) => (
          <StyledChip key={i} label={permission} />
        ))
      ) : (
        <StyledChip label="없음" />
      )}
    </TableCell>
  ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </TableWrapper>
)}

{selectedCategory && selectedSubCategory && (
  <TableWrapper>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
            <Checkbox
                  checked={readPermissionChecked}
                  onChange={handleReadPermissionChange}
                />
                읽기 권한</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
          {awsServiceList
  .find((service) => service.actionCrudName === selectedCategory)
  ?.menuList
  .filter((menu) => menu.menu === selectedSubCategory)
  .map((menu, index) => (
    <TableCell key={index}>
      {menu && menu.readPermissions.length > 0 ? (
        menu.readPermissions.map((permission, i) => (
          <StyledChip key={i} label={permission} />
        ))
      ) : (
        <StyledChip label="없음" />
      )}
    </TableCell>
  ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </TableWrapper>
)}

{selectedCategory && selectedSubCategory && (
  <TableWrapper>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
            <Checkbox
                  checked={updatePermissionChecked}
                  onChange={handleUpdatePermissionChange}
                />
                수정 권한</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
          {awsServiceList
  .find((service) => service.actionCrudName === selectedCategory)
  ?.menuList
  .filter((menu) => menu.menu === selectedSubCategory)
  .map((menu, index) => (
    <TableCell key={index}>
      {menu && menu.updatePermissions.length > 0 ? (
        menu.updatePermissions.map((permission, i) => (
          <StyledChip key={i} label={permission} />
        ))
      ) : (
        <StyledChip label="없음" />
      )}
    </TableCell>
  ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </TableWrapper>
)}

{selectedCategory && selectedSubCategory && (
  <TableWrapper>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
            <Checkbox
                  checked={deletePermissionChecked}
                  onChange={handleDeletePermissionChange}
                />
                삭제 권한</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
          {awsServiceList
  .find((service) => service.actionCrudName === selectedCategory)
  ?.menuList
  .filter((menu) => menu.menu === selectedSubCategory)
  .map((menu, index) => (
    <TableCell key={index}>
      {menu && menu.deletePermissions.length > 0 ? (
        menu.deletePermissions.map((permission, i) => (
          <StyledChip key={i} label={permission} />
        ))
      ) : (
        <StyledChip label="없음" />
      )}
    </TableCell>
  ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </TableWrapper>
)}

{selectedCategory && selectedSubCategory && (
  <div>
    <h4>선택된 권한 :</h4>
    <div>
      {Object.keys(selectedPermissions).map((permissionType) => (
        selectedPermissions[permissionType].length > 0 && (
          <React.Fragment key={permissionType}>
            <h5>{`${permissionType} 권한:`}</h5>
            {selectedPermissions[permissionType].map((permission, i) => (
              <StyledChip key={i} label={`${permissionType}: ${permission}`} permissionType={permissionType} />
            ))}
          </React.Fragment>
        )
      ))}
    </div>
  </div>
)}


    </RootContainer>
  );
};

export default SecondCreateForm;