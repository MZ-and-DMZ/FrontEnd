import PropTypes from 'prop-types';
import { useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';

export default function MailDetailItem({ compliances, selectedItem, selected, description, law, sx, date, ...other }) {
  const [expanded, setExpanded] = useState(false);

  const confirm = useBoolean();

  const handleToggleCollapse = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const dateObject = new Date(date);

  // 날짜, 시간, 분, 초 추출
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');
  const hours = String(dateObject.getHours()).padStart(2, '0');
  const minutes = String(dateObject.getMinutes()).padStart(2, '0');
  const seconds = String(dateObject.getSeconds()).padStart(2, '0');

  // 포맷팅된 문자열 생성
  const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초`;


  console.log(law);
  console.log(date);

  return (
    <>
      <ListItemButton
        onClick={handleToggleCollapse}
        sx={{
          p: 1,
          mb: 0.5,
          borderRadius: 1,
          ...(selected && {
            bgcolor: 'action.selected',
          }),
          ...sx,
        }}
        {...other}
      >
        <Box display="flex" flexDirection="column" justifyContent="space-between" flexGrow={1}>
          <ListItemText
            primary={compliances} // 수정된 부분
            primaryTypographyProps={{
              noWrap: false,
              variant: 'subtitle2',
            }}
          />
        </Box>
      </ListItemButton>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Stack direction="column" spacing={1} padding={2} borderLeft={1} borderColor="divider">
          <Typography variant="body2"> {description}</Typography> 
          <Typography variant="body2">근거 조항 : {law}</Typography> 

          <Button variant="outlined" color="primary">
            <>점검 일시 : {formattedDate}</>
          </Button>

          <Button variant="outlined" color="secondary" onClick={confirm.onTrue}>
            조치
          </Button>

          <ConfirmDialog
            open={confirm.value}
            onClose={confirm.onFalse}
            title="조치 완료"
            content={
              <>
                조치가 완료되었습니다.
              </>
            }
            action={
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  confirm.onFalse();
                }}
          >
            확인
          </Button>
        }
      />          
        </Stack>
      </Collapse>
    </>
  );
}

MailDetailItem.propTypes = {
  compliances: PropTypes.object,
  selected: PropTypes.bool,
  description: PropTypes.string, 
  law: PropTypes.array, 
  selectedItem: PropTypes.object,
  sx: PropTypes.object,
  date: PropTypes.string
};
