import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';

import { useBoolean } from 'src/hooks/use-boolean';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { parseUserLoggingList } from 'src/_mock/_log';

// ----------------------------------------------------------------------

export default function InvoiceTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}) {
  const { userName, date, version, historyDate, historyVersion, actionList, actionCount, status } = row;

  const confirm = useBoolean();

  const popover = usePopover();

   const collapse = useBoolean();

  const [tableData, setTableData] = useState(parseUserLoggingList);

  useEffect(() => {
  const fetchData = async () => {
  try {
  const data = await parseUserLoggingList();
  setTableData(data);
  } catch (error) {
  console.error('로그 데이터를 가져오고 구문 분석하는 동안 오류 발생:', error);
  // 에러 처리 로직을 추가할 수 있습니다.
  }
  };

  fetchData();
  }, []);

const renderPrimary = (
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        {/* <TableCell sx={{ display: 'flex', alignItems: 'center' }}> */}
          {/* <Avatar alt={invoiceTo.name} sx={{ mr: 2 }}>
            {invoiceTo.name.charAt(0).toUpperCase()}
          </Avatar> */}

          {/* <ListItemText
            disableTypography
            primary={
              <Typography variant="body2" noWrap>
                {user_name}
              </Typography>
            }
            secondary={
              <Link
                noWrap
                variant="body2"
                onClick={onViewRow}
                sx={{ color: 'text.disabled', cursor: 'pointer' }}
              >
                {invoiceNumber}
              </Link>
            }
          />
        </TableCell> */}

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

        {/* <TableCell>
          <ListItemText
            primary={format(new Date(dueDate), 'dd MMM yyyy')}
            secondary={format(new Date(dueDate), 'p')}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell> */}

        {/* <TableCell>{action_count}</TableCell>

        <TableCell>{version}</TableCell> */}

        <TableCell>{date}</TableCell>
        {/* <TableCell>{date}</TableCell> */}
        <TableCell>{version}</TableCell>
        {/* <TableCell>{actionCount}</TableCell> */}

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
              </TableCell>

        {/* <TableCell align="right" sx={{ px: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>
);

  const renderSecondary = (
  <TableRow>
    <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
      <Collapse
        in={collapse.value}
        timeout="auto"
        unmountOnExit
        sx={{ bgcolor: 'background.neutral' }}
      >
        <Stack component={Paper} sx={{ m: 1.5 }}>
          {historyVersion}
            <Stack
              // key={id}
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
              {/* Add checkboxes for date, version, and actionList */}
              <Checkbox
                // Customize the checkbox according to your needs
                // You may want to handle checkbox state and onChange event
              />
              <ListItemText
                primary={`action list: ${actionList}`}
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
        </Stack>
      </Collapse>
    </TableCell>
  </TableRow>
);

console.log('actionList',actionList);
      

  return (
    <>
      {renderPrimary}

      {renderSecondary}

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
