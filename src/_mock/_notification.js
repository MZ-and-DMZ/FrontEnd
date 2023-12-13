async function NotificationData() {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/notification/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const notificationData = await NotificationData();

export const _notificationList = [...Array(notificationData.notification_list.length)].map(
  (_, index) => ({
    id: notificationData.notification_list[index]._id,
    title: notificationData.notification_list[index].title,
    type: notificationData.notification_list[index].type,
    content: notificationData.notification_list[index].content,
    isUnRead: !notificationData.notification_list[index].isRead,
    category: 'Cummunications',
    createdAt: notificationData.notification_list[index].createtime.$date,
    detail: {
      positionName: notificationData.notification_list[index].detail.positionName,
      description: notificationData.notification_list[index].detail.description,
      csp: notificationData.notification_list[index].detail.csp,
      policies: notificationData.notification_list[index].detail.policies,
    },
  })
);
console.log(notificationData);

// ----------------------------------------------------------------------
// get read notification
export async function CheckReadNotification() {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/notification/check-new`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------------------------------------------------------
// post new notification
export async function PostNewNotification(notification) {
  const json_body = {
    title: notification.title,
    type: notification.type,
    content: notification.content,
    detail: {
      positionName: notification.detail.positionName,
      description: notification.detail.description,
      csp: notification.detail.csp,
      policies: notification.detail.policies,
    },
  };

  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/notification/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json_body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
