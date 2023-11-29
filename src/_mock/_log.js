import axios from 'axios';

async function LogData() {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/logging/list/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.logging_list;
  } catch (error) {
    console.log(error);
  }
}

export const parseLoggingList = async () => {
  try {
    const loggingList = await LogData();

    if (Array.isArray(loggingList)) {
      const parsedList = loggingList.map((user, index) => ({
        id: index,
        userName: user.user_name,
        date: user.date,
        version: user.version,
        actionCount: user.action_count,
        actionList: user.action_list || [],
      }));

      // parseLoggingList에서 파싱한 데이터를 restoreUser로 전달
      // parsedList.forEach((user) => {
      //   restoreUser(user.userName, user.version);
      // });

      return parsedList;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const restoreUser = async (user) => {
  try {
    // 복구할 사용자와 버전을 전송할 데이터 객체 생성
    const requestData = {
      userName: user.user_name,
      version: user.version,
    };

    const apiUrl = `${process.env.REACT_APP_MOCK_API}/logging/rollback/${user.userName}`;

    const response = await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error during user restoration:', error);
    throw error;
  }
};
