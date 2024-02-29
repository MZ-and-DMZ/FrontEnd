import React, { useState, useEffect } from 'react';
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
) {
  // Must use destructuring selectedCompliances assignment 에러 없애기 위해 다시 정의
  const selectedCSPfiltered = selectedCompliances;

  useEffect(() => {
    setSelectedItems(selectedCSPfiltered.selectedCompliances);
  }, [selectedCSPfiltered]);

  // 초기값을 selectedCSPfiltered.selectedCompliances로 설정하여 selectedItems 상태를 생성
  const [selectedItems, setSelectedItems] = useState(selectedCSPfiltered.selectedCompliances);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const matchedItems = selectedCSPfiltered.selectedCompliances.filter((item) =>
      item.standard.includes(inputValue) || 
      item.laws.includes(inputValue) || 
      item.description.includes(inputValue)
    );

    setSelectedItems(matchedItems);

  };

  console.log(selectedItems);
  return (
    <Stack flexGrow={1} sx={{ width: 1, minWidth: 0, borderRadius: 1.5, bgcolor: 'background.default' }}>
  <Stack sx={{ p: 2 }}>
    <TextField
      name="compliance"
      placeholder="Search..."
      onChange={handleInputChange}
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
          {selectedItems.map((item) => (
            <MailDetailItem
              key={item.id}
              compliances={item.standard}
              selected={selectedItems.includes(item) ? item : null}
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
