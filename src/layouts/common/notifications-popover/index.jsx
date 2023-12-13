import { m } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

// import { _notifications } from 'src/_mock';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { varHover } from 'src/components/animate';

import {
  READ_NOTIFICATION,
  REQUEST_POSITION,
} from 'src/redux/reducer/request/create/requestPositionSlice';

import { CheckReadNotification } from 'src/_mock/_notification';

import NotificationItem from './notification-item';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const dispatch = useDispatch();

  const drawer = useBoolean();

  const smUp = useResponsive('up', 'sm');

  const [currentTab, setCurrentTab] = useState('all');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const notifications = useSelector((state) => state.requestPosition);
  // const _notifications = useSelector((state) => state.requestPosition);
  // const [notifications, setNotifications] = useState(_notifications);

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const TABS = [
    {
      value: 'all',
      label: 'All',
      count: notifications.length,
    },
    {
      value: 'unread',
      label: 'Unread',
      count: totalUnRead,
    },
    {
      value: 'archived',
      label: 'Archived',
      count: notifications.length - totalUnRead,
    },
  ];

  const handleMarkAllAsRead = () => {
    dispatch(
      REQUEST_POSITION(
        notifications.map((notification) => ({
          ...notification,
          isUnRead: false,
        }))
      )
    );
  };

  const renderHead = (
    <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        알림
      </Typography>

      {!!totalUnRead && (
        <Tooltip title="Mark all as read">
          <IconButton
            color="primary"
            onClick={() => {
              dispatch(READ_NOTIFICATION());
              const res = CheckReadNotification();
              console.log('click', res);
            }}
          >
            <Iconify icon="eva:done-all-fill" />
          </IconButton>
        </Tooltip>
      )}

      {!smUp && (
        <IconButton onClick={drawer.onFalse}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      )}
    </Stack>
  );

  const renderTabs = (
    <Tabs value={currentTab} onChange={handleChangeTab}>
      {TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            <Label
              variant={((tab.value === 'all' || tab.value === currentTab) && 'filled') || 'soft'}
              color={
                (tab.value === 'unread' && 'info') ||
                (tab.value === 'archived' && 'success') ||
                'default'
              }
            >
              {tab.count}
            </Label>
          }
          sx={{
            '&:not(:last-of-type)': {
              mr: 3,
            },
          }}
        />
      ))}
    </Tabs>
  );

  const renderList = (
    <Scrollbar>
      <List disablePadding>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </List>
    </Scrollbar>
  );

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color={drawer.value ? 'primary' : 'default'}
        onClick={drawer.onTrue}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="solar:bell-bing-bold-duotone" width={24} />
        </Badge>
      </IconButton>

      <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 1, maxWidth: 420 },
        }}
      >
        {renderHead}

        <Divider />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: 2.5, pr: 1 }}
        >
          {renderTabs}
          {/* <IconButton
            onClick={() => {
              console.log('click');
              dispatch(READ_NOTIFICATION());
            }}
          >
            <Iconify icon="solar:settings-bold-duotone" />
          </IconButton> */}
        </Stack>

        <Divider />

        {renderList}

        {/* <Box sx={{ p: 1 }}>
          <Button fullWidth size="large">
            View All
          </Button>
        </Box> */}
      </Drawer>
    </>
  );
}
