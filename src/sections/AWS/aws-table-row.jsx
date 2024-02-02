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

import PositionQuickEditForm from './aws-quick-edit-form';

// ----------------------------------------------------------------------

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { name, groups, isMfaEnabled, AttachedPolicies } = row;

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

        {/* <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemText
            primary={name}
            // secondary={email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell> */}

        <TableCell sx={{whiteSpace: 'nowrap' }}>{name}</TableCell> 

        <TableCell sx={{whiteSpace: 'nowrap' }}>{groups}</TableCell>

        <TableCell sx={{whiteSpace: 'nowrap' }}>{isMfaEnabled}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
        {AttachedPolicies.split(',').slice(0, 3).join(', ')}
      </TableCell>

        {/* <TableCell>
          <Label
            variant="soft"
            color={
              (csp === 'AWS' && 'success') ||
              (csp === 'GCP' && 'warning') ||
              (csp === 'AWS,GCP' && 'info') ||
              'default'
            }
          >
            {csp}
          </Label>
        </TableCell> */}

        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>{group}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{position}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{lastLoginTime}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {isMfaEnabled}
          <Button
            variant="contained"
            color="primary"
            disabled={isMfaEnabled}  // isMfaEnabled가 true일 때 버튼 비활성화
          >
            {isMfaEnabled ? 'MFA 연동 완료' : 'MFA 연동 요청'}
          </Button>
        </TableCell> */}

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

          {/* <Tooltip title="Quick Edit" placement="top" arrow>
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>

          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton> */}
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
            {AttachedPolicies.split(',').map((policy, index) => (
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
                  primary={policy} // 현재 policy를 보여줍니다.
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
              { <ListItemText
                primary={`${name} 직무에 할당된 정책 수: ${policies.split(',').length}개`}
                primaryTypographyProps={{
                  typography: 'body2',
                }}
              /> }
            </Stack> */}
          </Stack>
        </Collapse>
      </TableCell>
    </TableRow>
  );

  return (
    <>
    {renderUserListView}
    {renderUserDetailView}
    {/* <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />  */}


      

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

UserTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};