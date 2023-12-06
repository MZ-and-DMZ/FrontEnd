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
      parsedList.forEach((user) => {
        restoreUser(user.userName, user.version);
      });

      return parsedList;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const restoreUser = async (selectedUsers) => {
  try {
    // 최소한 하나의 사용자가 선택되었는지 확인
    if (!Array.isArray(selectedUsers) || selectedUsers.length === 0) {
      // 사용자가 선택되지 않았을 때는 빈 배열 반환
      console.warn('No users selected for restoration.');
      return [];
    }

    // 선택한 사용자를 순회하며 각 사용자에 대해 API 호출
    const restorePromises = selectedUsers.map(async ({ userName, version }) => {
      const apiUrl = `${process.env.REACT_APP_MOCK_API}/logging/rollback/${
        userName || ''
      }?version=${version || ''}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          version,
        }),
      });

      if (!response.ok) {
        // 필요에 따라 비정상 응답 처리
        const responseData = await response.json();
        throw new Error(`서버가 비정상 상태로 응답했습니다: ${response.status}.`);
      }

      const responseData = await response.json();
      return responseData;
    });

    // 모든 복구 프로미스가 해결될 때까지 기다림
    const restoreResults = await Promise.all(restorePromises);

    // 선택한 사용자의 결과를 반환하거나 처리할 수 있음
    return restoreResults;
  } catch (error) {
    console.error('사용자 복구 중 오류 발생:', error.message);
    throw error;
  }
};

export const getCurrentDuration = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/logging/get/duration`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API 응답:', data);

    return data.duration;
  } catch (error) {
    console.error(`Error fetching current duration: ${error.message}`);
    return undefined;
  }
};





export const setDuration = async (userInputDuration) => {
  try {
    const apiUrl = `${process.env.REACT_APP_MOCK_API}/logging/set/duration?duration=${userInputDuration}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ duration: userInputDuration }),
    });

    const data = await response.json();
    return data.duration;  
  } catch (error) {
    console.error(error);
    throw error;  
  }
};

export async function getUsersExceptionList() {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/logging/list/exception/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.user_exception_list;
  } catch (error) {
    console.log(error);
    return undefined; // 에러가 발생한 경우에도 값을 반환하도록 추가
  }
}

export const deleteExceptionUser = async (userName) => {
  try {
    const apiUrl = `${process.env.REACT_APP_MOCK_API}/logging/delete/exception/user?user_name=${userName}`;

    const response = await fetch(apiUrl, {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
      },
      // Body에는 필요한 데이터를 전달할 필요가 있을 경우 추가
    });

    const data = await response.json();
    return data;  
  } catch (error) {
    console.error(error);
    throw error;  
  }
};

export const setExceptionUser = async (userName) => {
  try {
    const apiUrl = `${process.env.REACT_APP_MOCK_API}/logging/add/exception/user?user_name=${userName}`;

    const response = await fetch(apiUrl, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName }),
    });

    const data = await response.json();
    return data;  
  } catch (error) {
    console.error(error);
    throw error;  
  }
};