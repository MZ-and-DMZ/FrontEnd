import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { createAnomalyTime, editUserData, createUserData } from 'src/_mock';

export function SendTimeButton({ currentTime }) {
  const movePage = useNavigate();
  const _updatedtime = {};

  _updatedtime.groupName = useSelector((state) => state.groupName);
  console.log("check",_updatedtime.groupName);
  _updatedtime.startTime = useSelector((state) => state.startTime);
  _updatedtime.endTime = useSelector((state) => state.endTime);

  // Finish 버튼 클릭 시 실행될 함수
  const handleFinishButtonClick = async () => {
    try {
      const result = await createAnomalyTime(_updatedtime);
      if (result) {
        movePage('/dashboard/anomaly/list');
        window.location.reload();
      } 
    } catch (error) {
      console.error('Error:', error);
      // 에러 처리
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleFinishButtonClick}
      sx={{ mt: 3, mr: 3 }}
    >
      Finish
    </Button>
  );
}

SendTimeButton.propTypes = {
  currentTime: PropTypes.object,
};
