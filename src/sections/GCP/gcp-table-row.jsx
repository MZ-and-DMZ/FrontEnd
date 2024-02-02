import PropTypes from 'prop-types';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import { UPDATE_STEP3 } from 'src/redux/reducer/position/create/step3Slice';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import PositionQuickEditForm from './gcp-quick-edit-form';

// ----------------------------------------------------------------------

export default function GCPTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { name, type, roleList } = row;
  console.log(row);

  const confirm = useBoolean();

  const collapse = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  const handleTableRowClick = () => {
    quickEdit.onTrue(); // TableRow를 클릭하면 UserQuickEditForm 열기
  };

  const renderUserListView = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      {/* <TableCell sx={{ display: 'flex', alignItems: 'center' }}> */}
        {/* <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} /> */}

        {/* <ListItemText
          primary={name}
          // secondary={custom}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell> */}
      <TableCell sx={{whiteSpace: 'nowrap' }}>{name}</TableCell>

      {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>{phoneNumber}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{company}</TableCell> */}

      {/* <TableCell>
        <Label
          variant="soft"
          color={
            (csp === 'AWS' && 'success') ||
            (csp === 'GCP' && 'warning') ||
            (csp === 'AWS, GCP' && 'error') ||
            'default'
          }
        >
          {csp}
        </Label>
      </TableCell> */}
       <TableCell sx={{whiteSpace: 'nowrap' }}>{type}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        {roleList.split(',').join(', ')}
      </TableCell>

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

        {/* <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton> */}
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        {/* <Tooltip title="Quick Edit" placement="top" arrow>
          <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip> */}
      </TableCell>
    </TableRow>
  );

  const renderUserDetailView = (
    <TableRow>
      <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
        <Collapse
          in={collapse.value}
          timeout="auto"
          unmountOnExit
          sx={{ bgcolor: 'background.neutral' }}
        >
          <Stack component={Paper} sx={{ m: 1.5 }}>
            {roleList.split(',').map((role, index) => (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                sx={{
                  p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                  '&:not(:last-of-type)': {
                    borderBottom: (theme) => `solid 2px ${theme.palette.background.neutral}`,
                  },
                  '&:hover': {
                    background: 'rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <ListItemText
                  primary={role} // 현재 role을 보여줍니다.
                  primaryTypographyProps={{
                    typography: 'body2',
                  }}
                  secondaryTypographyProps={{
                    component: 'span',
                    color: 'text.disabled',
                    mt: 0.5,
                  }}
                />
              </Stack>
            ))}

            {/* <Stack
              direction="row"
              alignItems="center"
              sx={{
                p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                '&:not(:last-of-type)': {
                  borderBottom: (theme) => `solid 2px ${theme.palette.background.neutral}`,
                },
                background: 'rgba(0, 0, 0, 0.1)', // 마지막 스택을 강조하는 스타일
                borderRadius: (theme) => theme.shape.borderRadius,
                textAlign: 'center',
              }}
            >
              <ListItemText
                primary={`${name} 직무에 할당된 정책 수: ${policies.split(',').length}개`}
                primaryTypographyProps={{
                  typography: 'body2',
                }}
              />
            </Stack> */}
          </Stack>
        </Collapse>
      </TableCell>
    </TableRow>
  );

  // if (selected) {
  //   console.info('selected row', row);
  //   console.info('selected', selected);
  //   dispatch(SELECT_ROW(row));
  // } else {
  //   dispatch(SELECT_ROW({}));
  // }

  // useEffect(() => {
  //   if (selected) {
  //     console.info('selected row', row);
  //     console.info('selected', selected);
  //     dispatch(SELECT_ROW(row));
  //   } else {
  //     console.info('selected', selected);
  //     console.info('selected row', row);
  //     // dispatch(SELECT_ROW({}));
  //   }
  // }, [selected, row, dispatch]);

  return (
    <>
      {renderUserListView}
      {renderUserDetailView}
      {/* <PositionQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} /> */}

      {/* <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
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

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover> */}

      {/* <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      /> */}
    </>
  );
}

GCPTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
