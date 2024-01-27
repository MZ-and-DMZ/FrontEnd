import React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';

import { _gcpCheckList } from 'src/_mock/_complience';

import MailDetailItem from './mail-detail-item';


export default function MailDetails() {

  const selectedItem = _gcpCheckList.find((item) => item.description);

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

        {_gcpCheckList.map((item) => (
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
    </Stack>
  );
}

// MailDetails.propTypes = {
//   standard: PropTypes.string,
//   laws: PropTypes.array,
// };
