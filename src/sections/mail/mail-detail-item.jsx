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

export default function MailDetailItem({ compliances, selectedItem, selected, description, law, sx, ...other }) {
  const [expanded, setExpanded] = useState(false);

  const handleToggleCollapse = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  console.log(law);

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
            점검
          </Button>

          <Button variant="outlined" color="error">
            조치
          </Button>

          
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
};
