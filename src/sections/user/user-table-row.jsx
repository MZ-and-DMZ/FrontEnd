import PropTypes from 'prop-types';

import { useState } from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import UserQuickEditForm from './user-quick-edit-form';

// ----------------------------------------------------------------------

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { fullName, group, attachedPosition, duty, department, isMfaEnabled, lastLoginTime, csp, awsKeys, usedAwsKeys, awsRole, gcpRole, adGpo, keyCloakRole } = row;

  const confirm = useBoolean();

  const [confirmOpen, setConfirmOpen] = useState(false); // mfa 연동 다이얼로그 오픈 useState

  const quickEdit = useBoolean();

  const popover = usePopover();

  const handleMfaRequestClick = () => { // MFA 연동 요청 핸들러 함수 추가
    setConfirmOpen(true); // confirm 다이얼로그 열기
  };

  // const handleTableRowClick = () => {
  //   quickEdit.onTrue(); 
  // };

  const handleConfirm = () => {
    // 확인 버튼 클릭 시 처리 로직을 여기에 추가하세요.
    // 예: MFA 연동 요청 로직 등
    setConfirmOpen(false); // 다이얼로그 닫기
  };

  const handleCancel = () => {
    // 취소 버튼 클릭 시 처리 로직을 여기에 추가하세요.
    setConfirmOpen(false); // 다이얼로그 닫기
  };

  const renderUserListView = (
          <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell sx={{whiteSpace: 'nowrap' }}>{fullName}</TableCell>

        <TableCell sx={{whiteSpace: 'nowrap' }}>{department}</TableCell>

        <TableCell sx={{whiteSpace: 'nowrap' }}>{duty}</TableCell>

        <TableCell>
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
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{group}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{attachedPosition}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{lastLoginTime}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {isMfaEnabled}
          <Button
            variant="contained"
            color="primary"
            disabled={isMfaEnabled}  // isMfaEnabled가 true일 때 버튼 비활성화
            onClick={handleMfaRequestClick}
          >
            {isMfaEnabled ? 'MFA 연동 완료' : 'MFA 연동 요청'}
          </Button>

          <ConfirmDialog 
        open={confirmOpen} // confirmOpen 상태로 변경
        onClose={() => setConfirmOpen(false)} // confirmOpen 상태 변경 함수로 변경
        title="MFA 연동 요청"
        content={
          <>
            3일 뒤, MFA가 <strong> 강제 연동 </strong> 됩니다. <br />
            MFA 연동 전까지 계정 사용이 원활하지 않을 수 있습니다.
          </>
        }
        actions={ // 버튼 그룹을 actions prop으로 추가합니다.
          <>
            <Button onClick={handleCancel} color="secondary">
              취소
            </Button>
            <Button onClick={handleConfirm} color="primary" autoFocus>
              확인
            </Button>
          </>
        }
      />
 </TableCell>       

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
          </TableCell>

        {/* <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
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
          </IconButton> */}

          {/* <Tooltip title="Quick Edit" placement="top" arrow>
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>

          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton> */}
        {/* </TableCell> */}
      </TableRow>
  );

  // user detail 아코디언 버전 아카이브
  // const renderUserDetailView = (
  //   <TableRow>
  //     <TableCell colSpan={10}>
  //       <Collapse in={collapse.value} timeout="auto" unmountOnExit>
  //         <Stack spacing={2} direction="row" sx={{ mt: 1 }}>
  //           {Array.isArray(row.awsAccount) && (
  //             <Table>
  //               <TableBody>
  //                 {row.awsAccount.map((awsAcc) => (
  //                   <div key={awsAcc.id}>
  //                     <TableRow>
  //                       <TableCell>
  //                         <Stack direction="row" spacing={2}>
  //                           <Typography variant="subtitle1">Key Id:</Typography>
  //                           <Typography variant="body1">{awsAcc.managedKeys?.keyId}</Typography>
  //                         </Stack>
  //                       </TableCell>
  //                     </TableRow>
  //                     <TableRow>
  //                       <TableCell>
  //                         <Grid container spacing={2}>
  //                           <Grid item xs={6}>
  //                             <Typography variant="subtitle3">생성일:</Typography>
  //                             <Typography variant="body3">{awsAcc.managedKeys?.createDate}</Typography>
  //                           </Grid>
  //                           <Grid item xs={6}>
  //                             <Typography variant="subtitle3">만료일:</Typography>
  //                             <Typography variant="body3">{awsAcc.managedKeys?.keyExpirationDate}</Typography>
  //                           </Grid>
  //                         </Grid>
  //                       </TableCell>
  //                     </TableRow>
  //                     <Divider />
  //                   </div>
  //                 ))}
  //               </TableBody>
  //             </Table>
  //           )}
  //         </Stack>
  //       </Collapse>
  //     </TableCell>
  //   </TableRow>
  // );

  return (
    <>
    {renderUserListView}
    {/* {renderUserDetailView} */}
    <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} /> 


      

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