import React, { useState, useEffect, userCallback } from 'react';
import { setDuration, getCurrentDuration, getUsersExceptionList, deleteExceptionUser } from 'src/_mock/_log';
// import { _userList } from 'src/_mock';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Checkbox from '@mui/material/Checkbox';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import InvoiceDetailTableToolbar from './invoice-detail-table-toolbar';

const InvoiceDetail = () => {
  const [awsDuration, setAwsDuration] = useState(5);
  const [gcpDuration, setGcpDuration] = useState(5);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentAwsDuration, setCurrentAwsDuration] = useState();
  const [currentGcpDuration, setCurrentGcpDuration] = useState(null);
  const [allowDurationChange, setAllowDurationChange] = useState(false);
  const [tableEnabled, setTableEnabled] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [tabValue, setTabValue] = useState(0); // 0: AWS, 1: GCP
  const [usersData, setUsersData] = useState([]);
  const rowsPerPageOptions = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


useEffect(() => {
  const fetchCurrentDuration = async () => {
    try {
      const awsDurationData = await getCurrentDuration('AWS');

      if (awsDurationData !== undefined) {
        // 아래 부분에서 변경
        const parsedAwsDuration = parseInt(awsDurationData, 10);

        setCurrentAwsDuration(parsedAwsDuration);
        setAwsDuration(parsedAwsDuration);
      } 
    } catch (error) {
      console.error(`현재 주기를 가져오는 중 오류 발생: ${error.message}`);
    }
  };

  fetchCurrentDuration();
}, []);

useEffect(() => {
  const fetchUserExceptionList = async () => {
    try {
      const users = await getUsersExceptionList();
      setUsersData(users);
    } catch (error) {
      console.error('사용자 데이터를 가져오는 중 오류 발생:', error.message);
    }
  };

  // 페이지가 로드될 때 사용자 데이터 호출
  fetchUserExceptionList();
}, []);

const handleDeleteUser = async (userId) => {
  try {
    // 삭제 API 호출
    const deleteResult = await deleteExceptionUser(userId);

    // 콘솔에 deleteResult 출력
    console.log('deleteResult:', deleteResult);

    // 삭제 성공 여부 확인
    if (deleteResult.message === 'user delete success') {
      console.log(`사용자 ID ${userId}를 성공적으로 삭제했습니다.`);

      // 사용자 삭제 후, 권한 최적화 예외 대상을 다시 불러옴 (업데이트된 목록을 반영하기 위해)
      const updatedUsers = await getUsersExceptionList();
      setUsersData(updatedUsers);

      // 삭제 성공 메시지를 Snackbar로 표시
      setSnackbarOpen(true);
      setSnackbarMessage(`사용자 ID ${userId}를 성공적으로 삭제했습니다.`);
    } else {
      console.error(`사용자 ID ${userId} 삭제 중 오류 발생: ${deleteResult.message}`);
    }
  } catch (error) {
    console.error(`사용자 ID ${userId} 삭제 중 오류 발생: ${error.message}`);
  }
};






const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSwitchChange = () => {
    setAllowDurationChange(!allowDurationChange);
    setTableEnabled(!allowDurationChange);
    if (!allowDurationChange) {
      // 권한 회수 기능이 활성화되었을 때 메시지 표시
      setSnackbarOpen(true);
      // 권한 회수 기능이 활성화되었습니다. 메시지를 Snackbar로 표시
      setSnackbarMessage('권한 최적화 기능이 활성화되었습니다.');
    } else {
      // 권한 회수 기능이 비활성화되었을 때 메시지 표시
      setSnackbarOpen(true);
      // 권한 회수 기능이 비활성화되었습니다. 메시지를 Snackbar로 표시
      setSnackbarMessage('권한 최적화 기능이 비활성화되었습니다.');
    }
  };

const handleDurationChange = async (provider, duration) => {
  try {
    if (allowDurationChange) {
      // 권한 회수 기능이 활성화된 경우에만 설정 가능
      const result = await setDuration(duration, provider);
      console.log(`${provider}에 대한 최적화 주기가 성공적으로 설정되었습니다: ${result}`);

      // result를 string으로 변환하여 출력
      const stringResult = String(result);
      console.log(`String 형식으로 변환된 결과: ${stringResult}`);

      // 설정 후 현재 회수 주기 다시 가져와서 업데이트
      const awsDurationData = await getCurrentDuration('AWS');
      const gcpDurationData = await getCurrentDuration('GCP');

      setCurrentAwsDuration(awsDurationData);
      setCurrentGcpDuration(gcpDurationData);

      // AWS 권한 회수 주기가 며칠로 설정되었습니다. 메시지를 Snackbar로 표시
      setSnackbarOpen(true);
      setSnackbarMessage(`${provider} 권한 최적화 주기가 ${duration}일로 설정되었습니다.`);
    } else {
      console.log('권한 회수 기능이 비활성화되어 있습니다.');
    }
  } catch (error) {
    console.error(`${provider}에 대한 회수 주기를 설정하는 중 오류 발생: ${error}`);
  }
};

  const renderDurationOptions = () => (
    Array.from({ length: 18 }, (_, index) => (index + 1) * 5).map((day) => (
      <MenuItem key={day} value={day}>
        {`${day}일`}
      </MenuItem>
    ))
  );

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleUserSelect = (user) => {
  if (selectedUsers.includes(user)) {
    setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser !== user));
  } else {
    setSelectedUsers([...selectedUsers, user]);
  }
};

const [filters, setFilters] = useState({
    userName: '',
    startDate: null,
    endDate: null,
    // Add more filters as needed
  });
  
const handleFiltersChange = (filterKey, value) => {
  setFilters((prevFilters) => ({
    ...prevFilters,
    [filterKey]: value,
  }));
};

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        권한 최적화
      </Typography>

      {/* 스위치: 권한 회수 기능 활성화/비활성화 */}
      <FormControlLabel
        control={<Switch checked={allowDurationChange} onChange={handleSwitchChange} />}
        label="권한 최적화 기능 활성화"
      />

      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="AWS" />
        <Tab label="GCP" />
      </Tabs>

      {/* AWS 회수 주기 설정 */}
      {tabValue === 0 && (
      <Box marginTop={2}>
        <Typography variant="h5" gutterBottom>
          AWS 권한 최적화 주기 설정
        </Typography>

        <Typography variant="body1" gutterBottom>
            현재 AWS 권한 최적화 주기: {`${currentAwsDuration}일`}
          </Typography>
          
          <Select
          id="awsDuration"
          value={awsDuration}
          onChange={(e) => setAwsDuration(parseInt(e.target.value, 10))}
          disabled={!allowDurationChange}
        >
          {renderDurationOptions()}
        </Select> 
        
        <Button onClick={() => handleDurationChange('AWS', awsDuration)} variant="contained" color="primary" disabled={!allowDurationChange}>
          적용
        </Button>
      </Box>
      )}

        {tabValue === 1 && ( 
        <Box marginTop={2}>
        <Typography variant="h5" gutterBottom>
          GCP 권한 최적화 주기 설정
        </Typography>
        
        <Typography variant="body1" gutterBottom>
            현재 GCP 권한 최적화 주기: {`${currentGcpDuration}일`}
          </Typography>

        <Select
          id="gcpDuration"
          value={gcpDuration}
          onChange={(e) => setGcpDuration(parseInt(e.target.value, 10))}
          disabled={!allowDurationChange}
        >
          {renderDurationOptions()}
        </Select> 
        <Button onClick={() => handleDurationChange('GCP', gcpDuration)} variant="contained" color="primary" disabled={!allowDurationChange}>
          적용
        </Button>
      </Box>

      
 )}



      <Box marginTop={5} >
      <Typography variant="h4" gutterBottom>
        권한 최적화 예외 대상
      </Typography>
      <TableContainer>

        <InvoiceDetailTableToolbar
        filters={filters}
        onFilters={handleFiltersChange}
        dateError={false} // Set as needed
        serviceOptions={[]} // Set as needed
      />

    <Table>
      <TableHead>
        <TableRow>
          <TableCell>선택</TableCell>
          <TableCell>사용자</TableCell>
          <TableCell>그룹</TableCell>
          <TableCell>직무</TableCell>
          <TableCell>업데이트 날짜</TableCell>
          <TableCell>작업</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {usersData.map((user) => (
          <TableRow key={user._id}>
            <TableCell>
              <Checkbox
                checked={selectedUsers.includes(user._id)}
                onChange={() => handleUserSelect(user._id)}
                disabled={!tableEnabled}
              />
            </TableCell>
            <TableCell>{user._id}</TableCell>
            <TableCell>{user.groups}</TableCell>
            <TableCell>{user.position}</TableCell>
            <TableCell>{user.updateTime}</TableCell>
            <TableCell>
              <Button variant="outlined" color="primary" onClick={() => handleDeleteUser(user._id)} disabled={!tableEnabled}>
                제거
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

        <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={usersData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Box>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000} // 6초 동안 표시 후 자동으로 닫힘
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        style={{ marginTop: '50px' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', color: 'white', backgroundColor: theme => theme.palette.primary.main, '& .MuiAlert-icon': {
        color: 'white', // 아이콘 색상 변경
      } }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default InvoiceDetail;
