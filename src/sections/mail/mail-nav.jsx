import PropTypes from 'prop-types';
import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useResponsive } from 'src/hooks/use-responsive';

import { _gcpCheckList, _awsCheckList } from 'src/_mock/_complience';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import MailNavItem from './mail-nav-item';
// import { MailNavItemSkeleton } from './mail-skeleton';

// ----------------------------------------------------------------------

export default function MailNav({
  // handleCSPChange,
  selectedLabelId,
  // loading,
  openNav,
  onCloseNav,
  //
  // labels,
  selectedType,
  handleClickType,
  //
  // onToggleCompose,
}) {
  const mdUp = useResponsive('up', 'md');

  // const renderSkeleton = (
  //   <>
  //     {[...Array(8)].map((_, index) => (
  //       <MailNavItemSkeleton key={index} />
  //     ))}
  //   </>
  // );


  const [selectedCSP, setSelectedCSP] = useState('');

  const renderTypeList = (
    <>
    {Array.from(new Set(_gcpCheckList.map(item => item.type))).map(type => (
      <MailNavItem
        key={type}
        compliances={type} 
        selected={selectedType === type}  // Check if selectedType matches the type
        onClickNavItem={() => handleClickType(type)}
      />
    ))}
  </>
  );

    // if (selectedCSP === 'AWS') {
    //   _awsCheckList.map((item) => (
    //     <MailNavItem
    //       key={item.type}
    //       type={item} 
    //       selected={selectedType === item.type}
    //       onClickNavItem={() => handleClickType(item.type)}
    //     />
    //   ));
    // } else if (selectedCSP === 'GCP') {
    //   _gcpCheckList.map((item) => (
    //     <MailNavItem
    //       key={item.type}
    //       type={item} 
    //       selected={selectedType === item.type}
    //       onClickNavItem={() => handleClickType(item.type)}
    //     />
    //   ));
    // }
  
    // return null; // 선택된 CSP가 없는 경우

  // const renderList = (
  //   <>
  //     {labels.map((label) => (
  //       <MailNavItem
  //         key={label.id}
  //         label={label}
  //         selected={selectedLabelId === label.id}
  //         onClickNavItem={() => {
  //           handleClickLabel(label.id);
  //         }}
  //       />
  //     ))}
  //   </>
  // );

  const renderContent = (
    <>
      <Stack
        sx={{
          p: (theme) => ({
            xs: theme.spacing(2.5, 2.5, 2, 2.5),
            md: theme.spacing(2, 1.5),
          }),
        }}
      >

<Select
  fullWidth
  value={selectedCSP}
  onChange={(event) => setSelectedCSP(event.target.value)}
  displayEmpty
  inputProps={{ 'aria-label': 'CSP 선택' }}
>
  <MenuItem value="" disabled>
    CSP 선택
  </MenuItem>
  <MenuItem value="AWS">AWS</MenuItem>
  <MenuItem value="GCP">GCP</MenuItem>
</Select>

{/* <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
            {selectedType}
          </Typography> */}

      </Stack>
        
        {/* <Button
          fullWidth
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="solar:pen-bold" />}
          onClick={onToggleCompose}
        >
          Compose
        </Button> */}

      <Scrollbar>
        <Stack
          sx={{
            px: { xs: 3.5, md: 2.5 },
          }}
        >
      {/* {loading && renderSkeleton} */}

      {renderTypeList}

      {/* {!!_gcpCheckList && _gcpCheckList.length > 0 && renderTypeList} */}


        </Stack>
      </Scrollbar>
    </>
  );

  return mdUp ? (
    <Stack
      sx={{
        width: 200,
        flexShrink: 0,
      }}
    >
      {renderContent}
    </Stack>
  ) : (
    <Drawer
      open={openNav}
      onClose={onCloseNav}
      slotProps={{
        backdrop: { invisible: true },
      }}
      PaperProps={{
        sx: {
          width: 260,
        },
      }}
    >
      {renderContent}
    </Drawer>
  );
}

MailNav.propTypes = {
  // selectedCSP: PropTypes.string,
  // handleCSPChange: PropTypes.func,
  handleClickType: PropTypes.func,
  selectedLabelId: PropTypes.string,
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
  selectedType: PropTypes.string,  // 이 부분을 확인해주세요.
};
