import React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { _gcpCheckList } from 'src/_mock/_complience';

import MailDetailItem from './mail-detail-item';


export default function MailDetails(
  selectedCompliances,
  // handleClickDescription,
  // selectedCSP,
) {

  const selectedCSPfiltered = selectedCompliances;

  // csp 선택하면 어떻게 처리할지 좀 봐야 함. 
  console.log("확인",selectedCSPfiltered.selectedCompliances);
  const selectedItem = selectedCSPfiltered.selectedCompliances.find((item) => item.description);

  return (
    <Stack flexGrow={1} sx={{ width: 1, minWidth: 0, borderRadius: 1.5, bgcolor: 'background.default' }}>
  <Stack sx={{ p: 2 }}>
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
  </Stack>
  <Scrollbar>
    <Stack
      sx={{
        px: { xs: 3.5, md: 2.5 },
      }}
    >
      {selectedCSPfiltered.selectedCompliances.map((item) => (
        <MailDetailItem
          key={item.id}
          compliances={item.standard} 
          selected={selectedItem}
          description={item.description}
          law={item.laws}
          date={item.date}
        />
      ))}
    </Stack>
  </Scrollbar>
</Stack>

  );
}

// MailDetails.propTypes = {
//   standard: PropTypes.string,
//   laws: PropTypes.array,
// };
