import React, { useState, useEffect } from 'react';
import { setDuration, getCurrentDuration } from 'src/_mock/_log';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import Label from 'src/components/label/label';

const InvoiceDetail = () => {
  const [awsDuration, setAwsDuration] = useState(5);
  const [gcpDuration, setGcpDuration] = useState(5);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentAwsDuration, setCurrentAwsDuration] = useState(null);
  const [currentGcpDuration, setCurrentGcpDuration] = useState(null);
  const [allowDurationChange, setAllowDurationChange] = useState(true);

useEffect(() => {
  // 페이지가 로드될 때 현재 회수 주기를 가져와서 설정
  const fetchCurrentDuration = async () => {
    try {
      const awsDurationData = await getCurrentDuration('AWS');
      const gcpDurationData = await getCurrentDuration('GCP');

      if (awsDurationData !== undefined) {
        setCurrentAwsDuration(awsDurationData);
        // AWS 초기 상태 설정
        setAwsDuration(awsDurationData);
      } else {
        console.error('AWS 회수 주기를 가져오는 데 문제가 있습니다.');
      }

      if (gcpDurationData !== undefined) {
        setCurrentGcpDuration(gcpDurationData);
        // GCP 초기 상태 설정
        setGcpDuration(gcpDurationData);
      } else {
        console.error('GCP 회수 주기를 가져오는 데 문제가 있습니다.');
      }
    } catch (error) {
      console.error(`현재 주기를 가져오는 중 오류 발생: ${error.message}`);
    }
  };

  fetchCurrentDuration();
}, []);

  const handleSwitchChange = () => {
    setAllowDurationChange(!allowDurationChange);
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

      {/* AWS 회수 주기 설정 */}
      <Box>
        <Typography variant="h5" gutterBottom>
          AWS 최적화 주기 설정
        </Typography>
        <Label htmlFor="awsDuration">AWS 최적화 주기가 </Label>
        <Select
          id="awsDuration"
          value={awsDuration}
          onChange={(e) => setAwsDuration(parseInt(e.target.value, 10))}
          disabled={!allowDurationChange}
        >
          {renderDurationOptions()}
        </Select> <Label>로 설정 됩니다.</Label>
        
        <Button onClick={() => handleDurationChange('AWS', awsDuration)} variant="contained" color="primary" disabled={!allowDurationChange}>
          적용
        </Button>
        {currentAwsDuration !== null && (
          <Typography variant="body1" gutterBottom>
            현재 AWS에 설정된  주기: {`${currentAwsDuration}일`}
          </Typography>
        )}
      </Box>

      {/* GCP 회수 주기 설정 */}
      <Box>
        <Typography variant="h5" gutterBottom>
          GCP 회수 주기 설정
        </Typography>
        <Label htmlFor="gcpDuration">GCP 회수 주기가 </Label>
        <Select
          id="gcpDuration"
          value={gcpDuration}
          onChange={(e) => setGcpDuration(parseInt(e.target.value, 10))}
          disabled={!allowDurationChange}
        >
          {renderDurationOptions()}
        </Select> <Label>로 설정 됩니다. </Label>
        <Button onClick={() => handleDurationChange('GCP', gcpDuration)} variant="contained" color="primary" disabled={!allowDurationChange}>
          적용
        </Button>
        {currentGcpDuration !== null && (
          <Typography variant="body1" gutterBottom>
            현재 GCP에 설정된 회수 주기: {`${currentGcpDuration}일`}
          </Typography>
        )}
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // 6초 동안 표시 후 자동으로 닫힘
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default InvoiceDetail;
