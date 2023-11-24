import PropTypes from 'prop-types';

import { format } from 'date-fns';

import { useState } from 'react';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
// import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
// import Collapse from '@mui/material/Collapse';
// import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function InvoiceTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}) {
  const { userName, date, version, actionList, actionCount } = row;

  const confirm = useBoolean();

  const popover = usePopover();

  //  const collapse = useBoolean();

   const [ setSelectedAction ] = useState(actionCount);

const renderPrimary = (
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={userName}
            // secondary={date}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={format(new Date(date), 'yyyy/MMM/dd')}
            secondary={format(new Date(date), 'p')}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        {/* <TableCell>{date}</TableCell> */}
        <TableCell>{`Version ${version}`}</TableCell>
        {/* <TableCell>{actionCount}</TableCell> */}

        <TableCell>
          <ListItemText
        primary={
          Array.isArray(actionList) ? (
            <Select
              value={actionCount}
              onChange={(event) => setSelectedAction(event.target.value)}
              displayEmpty
              sx={{ minWidth: 120 }}
            >
              <MenuItem key="default" value={actionCount}>{`할당된 권한 수 : ${actionCount}`}</MenuItem>
              {actionList.map((action, index) => (
                <MenuItem key={index} value={action}>
                  {`${action}`}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <span>{actionList}</span>
          )
        }
        primaryTypographyProps={{
          typography: 'body2',
        }}
        secondaryTypographyProps={{
          component: 'span',
          color: 'text.disabled',
          mt: 0.5,
        }}
      />
        </TableCell>
        
        {/* <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'paid' && 'success') ||
              (status === 'pending' && 'warning') ||
              (status === 'overdue' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell> */}

        
        {/* drop down icon
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
                <IconButton
                  color={collapse.value ? 'inherit' : 'default'}
                  onClick={collapse.onToggle}
                  sx={{
                    ...(collapse.value && {
                      bgcolor: 'action.hover',
                    }),
                  }}
                >
                  <Iconify icon="eva:arrow-ios-downward-fill" />
                </IconButton>
              </TableCell> */}

        {/* <TableCell align="right" sx={{ px: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>
);

//   const renderSecondary = (
//   <TableRow>
//     <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
//       <Collapse
//         in={collapse.value}
//         timeout="auto"
//         unmountOnExit
//         sx={{ bgcolor: 'background.neutral' }}
//       >
// <Stack
//       direction="row"
//       alignItems="center"
//       sx={{
//         p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
//         '&:not(:last-of-type)': {
//           borderBottom: (theme) => `solid 2px ${theme.palette.background.neutral}`,
//         },
//         '&:hover': {
//           background: 'rgba(0, 0, 0, 0.1)',
//         },
//       }}
//     >
//       <ListItemText
//         primary={
//           Array.isArray(actionList) ? (
//             <div>
//               {actionList.length > 0 ? `${actionCount} : ${actionList.join(', ')}` : actionCount}
//             </div>
//           ) : (
//             <span>{actionList}</span>
//           )
//         }
//         primaryTypographyProps={{
//           typography: 'body2',
//         }}
//         secondaryTypographyProps={{
//           component: 'span',
//           color: 'text.disabled',
//           mt: 0.5,
//         }}
//       />
//     </Stack>
//       </Collapse>
//     </TableCell>
//   </TableRow>
// );

// 체크박스 선택시 상단에 뜨는 휴지통, 롤백 아이콘
  return (
    <>
      {renderPrimary}
      {/* {renderSecondary} */}

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}

InvoiceTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
