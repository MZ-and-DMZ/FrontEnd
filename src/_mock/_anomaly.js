// 시간대 리스트 
async function AnomalyTimeData() {
    try {
      const response = await fetch(`${process.env.REACT_APP_MOCK_API}/anomaly/detection/timelist`, {
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

const anomalyTimeData = await AnomalyTimeData();

export const _anomalyTimeList = [...Array(anomalyTimeData.time_list.length)].map((_, index) => ({
  id: index,
  group: anomalyTimeData.time_list[index].group,
  startTime: anomalyTimeData.time_list[index].startTime,
  endTime: anomalyTimeData.time_list[index].endTime,
}));

// IP 주소의 유효성을 검사하는 함수
const isFilledTime = (group, start, end) => {
  if (group === "" || start === "" || end === ""){
    return false;
  }
  return true;
}

// 시간대 목록 생성
export async function createAnomalyTime(data) {
    try {
      // 입력된 IP 주소의 유효성을 검사
        if (!isFilledTime(data.groupName, data.startTime, data.endTime)) {
          return false;
        }

        const response = await fetch(`${process.env.REACT_APP_MOCK_API}/anomaly/detection/time/set`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            group: data.groupName,
            startTime: data.startTime,
            endTime: data.endTime,
          }),
        });

      return response.ok;
    } catch (error) {
      console.error(error);
      throw error;
    }
}

// IP 목록
async function AnomalyIPData() {
    try {
      const response = await fetch(`${process.env.REACT_APP_MOCK_API}/anomaly/detection/iplist`, {
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

const anomalyIPData = await AnomalyIPData();

export const _anomalyIPList = [...Array(anomalyIPData.ip_list.length)].map((_, index) => ({
  id: index,
  ip: anomalyIPData.ip_list[index].ip,
}));

// IP 주소의 유효성을 검사하는 함수
const isValidIPAddress = (ipAddress) => {
    // IPv4 주소 형식을 검증하는 정규 표현식
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ipAddress);
}
  
// IP 목록 생성
export async function createAnomalyIP(data) {
    try {
        // 입력된 IP 주소의 유효성을 검사
        if (!isValidIPAddress(data.ip)) {
            return false;
        }

        const response = await fetch(`${process.env.REACT_APP_MOCK_API}/anomaly/detection/ip/set`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ip: data.ip,
        }),
        });

        return response.ok;
    } catch (error) {
        console.error(error);
        throw error;
    }
}