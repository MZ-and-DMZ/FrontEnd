import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { ConfirmDialog } from 'src/components/custom-dialog';
import React, { useState } from 'react';

import { createAnomalyIP } from 'src/_mock';

export function SendIPButton({ currentIP }) {
  const movePage = useNavigate();

  const _updatedip = {};
  
  const [confirmOpen, setConfirmOpen] = useState(false);

  _updatedip.ip = useSelector((state) => state.ip);
  console.log("check",_updatedip.ip);


  // Finish 버튼 클릭 시 실행될 함수
  const handleFinishButtonClick = async () => {
    try {
      const result = await createAnomalyIP(_updatedip);
      if (result) {
        movePage('/dashboard/anomaly/list');
        window.location.reload();
      } else {
        setConfirmOpen(true);
        console.log('Failed to create anomaly IP');
        // 실패한 경우에 대한 처리 - 팝업으로 경고창 나오게 하면 될듯
        
      }
    } catch (error) {
      console.error('Error:', error);
      // 에러 처리
    }
  };

  return (
    <>
    <Button
      variant="contained"
      color="primary"
      onClick={handleFinishButtonClick}
      sx={{ mt: 3, mr: 3 }}
    >
      Finish
    </Button>
    <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="IP 형식 오류"
        content={
          <>
            IP 형식으로 입력하시오
            예) 127.0.0.1
          </>
        }
        action={
          <Button
            variant="contained"
            color="primary"
            onClick={() => setConfirmOpen(false)}
          >
            확인
          </Button>
        }
      />
    </>
  );
}

SendIPButton.propTypes = {
  currentIP: PropTypes.object,
};
