import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { _gcpCheckList, _awsCheckList } from 'src/_mock/_complience';
import MailItem from './mail-item';

export default function IdList({
  openMail,
  onCloseMail,
  handleClickId,
  selectedId,
  selectedType,  // 변경된 부분: selectedType을 받아옴
  // selectedMailId,
}) {
  const mdUp = useResponsive('up', 'md');

  const renderList = (
    <>
      {_gcpCheckList
        // .filter((item) => item.type === selectedType)
        .map((item) => (
          <MailItem
            key={item.type}
            compliances={item.id}
            selected={selectedId === item.id}
            onClick={() => handleClickId(item.id)}
          />
        ))}
    </>
  );

  const renderContent = (
    <>
      <Stack sx={{ p: 2 }}>
        {mdUp ? (
          <TextField
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
            {selectedType}  {/* 변경된 부분: selectedType으로 표시 */}
          </Typography>
        )}
      </Stack>

      <Scrollbar sx={{ px: 2 }}>
        {renderList}
      </Scrollbar>
    </>
  );

  return mdUp ? (
    <Stack
      sx={{
        width: 320,
        flexShrink: 0,
        borderRadius: 1.5,
        bgcolor: 'background.default',
      }}
    >
      {renderContent}
    </Stack>
  ) : (
    <Drawer
      open={openMail}
      onClose={onCloseMail}
      slotProps={{
        backdrop: { invisible: true },
      }}
      PaperProps={{
        sx: {
          width: 320,
        },
      }}
    >
      {renderContent}
    </Drawer>
  );
}

IdList.propTypes = {
  handleClickId: PropTypes.func,
  onCloseMail: PropTypes.func,
  openMail: PropTypes.bool,
  selectedId: PropTypes.string, 
  selectedType: PropTypes.string, 
  // selectedMailId: PropTypes.string,
};
