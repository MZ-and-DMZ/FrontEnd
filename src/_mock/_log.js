async function LogData() {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/logging/list/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.logging_list; // logging_list 프로퍼티를 반환합니다.
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
        // history: user.history.map((entry) => ({
        //   date: entry.date,
        //   version: entry.version,
        //   actionCount: entry.action_count,
        //   actionList: entry.action_list || [],
        }));
      return parsedList;
    }
      return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

// async function UserLogData() {
//   try {
//     const response = await fetch(`${process.env.REACT_APP_MOCK_API}/logging/history/mzdmz_heo`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const data = await response.json();
//     return data.logging_user_history; 
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const parseUserLoggingList = async () => {
//   try {
//     const loggingUserHistory = await UserLogData();

//     if (!Array.isArray(loggingUserHistory)) {
//       console.error('UserLogData가 배열을 반환하지 않았습니다:', loggingUserHistory);
//       return [];
//     }

//     const parsedList = loggingUserHistory.map((history) => {
//       // history가 필요한 속성을 가지고 있는지 확인합니다.
//       if (!history.date || !history.version || !Array.isArray(history.action_list)) {
//         console.error('유효하지 않은 history 객체입니다:', history);
//         return null; // map에서이 항목을 건너 뜁니다.
//       }

//       const actionList = history.action_list;

//       return {
//         historyDate: history.date,
//         historyVersion: history.version,
//         actionList,
//       };
//     }).filter(Boolean); // 배열에서 null 값을 제거합니다.

//     console.log('파싱된 사용자 로깅 목록:', parsedList);
//     return parsedList;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };


 
