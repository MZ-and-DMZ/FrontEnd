import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import { paths } from 'src/routes/paths';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { _departmentList } from 'src/_mock/_department';

import GroupQuickEditForm from './group-quick-edit-form';


// ----------------------------------------------------------------------

export default function GroupTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { departmentName, awsRole, gcpRole, adGpo, keyCloakRole } = row;

  // const moveToUserList = () => {
  //   // 브라우저의 현재 URL을 변경하여 사용자 목록으로 이동합니다.
  //   // 예를 들어, /users/:departmentName 경로로 이동합니다.
  //   history.push(`/users/${departmentName}`);
  // };

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  const collapse = useBoolean();

  // const handleTableRowClick = () => {
  //   quickEdit.onTrue(); 
  // };

  const renderDepartmentListView = (
    <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{departmentName}</TableCell>

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

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{awsRole}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{gcpRole}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{adGpo}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{keyCloakRole}</TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>

        <Tooltip title="상세 정보 더보기" placement="top" arrow>
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
          </Tooltip>

          <Tooltip title="사용자 목록으로 이동" placement="top" arrow>
        <IconButton
            component={RouterLink}
            href={paths.dashboard.user.root}
            color={collapse.value ? 'inherit' : 'default'}
            onClick={collapse.onToggle}
          >
          <Iconify icon="solar:eye-bold" />
          </IconButton>
          </Tooltip>


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

  const renderDepartmentDetailView = (
    <TableRow>
      <TableCell colSpan={10}>
        <Collapse in={collapse.value} timeout="auto" unmountOnExit>
          <Stack spacing={2} direction="column" sx={{ mt: 1 }}>
            <Stack direction="row" spacing={2}>
              <Typography variant="subtitle1">AWS Role:</Typography>
              <Stack direction="column" spacing={1}>
                {row.awsRole.map((role, index) => (
                  <Typography key={index} variant="body1">{role}</Typography>
                ))}
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography variant="subtitle1">GCP Role:</Typography>
              <Stack direction="column" spacing={1}>
                {row.gcpRole.map((role, index) => (
                  <Typography key={index} variant="body1">{role}</Typography>
                ))}
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography variant="subtitle1">AD GPO:</Typography>
              <Stack direction="column" spacing={1}>
                {row.adGpo.map((gpo, index) => (
                  <Typography key={index} variant="body1">{gpo}</Typography>
                ))}
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography variant="subtitle1">KeyCloak Role:</Typography>
              <Stack direction="column" spacing={1}>
                {row.keyCloakRole.map((role, index) => (
                  <Typography key={index} variant="body1">{role}</Typography>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Collapse>
      </TableCell>
    </TableRow>
  );
  

  return (    
    <>  
  <GroupQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />
      {renderDepartmentListView}
      {renderDepartmentDetailView}

      <CustomPopover
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
      

GroupTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
