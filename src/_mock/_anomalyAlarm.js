export const ANOMALY_OPTIONS = [
    { value: 'Time,IP', label: 'Time,IP' },
    { value: 'Time', label: 'Time' },
    { value: 'IP', label: 'IP' },
  ];

  // alarm 가져오기
async function getAnomalyAlarmList() {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/anomaly/detection/alertlist`, {
      
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('Anomaly detection alarm List:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data from /anomaly/detection/alertlist:', error);
    throw error;
       
  }
}

const AnomalyAlarmData = await getAnomalyAlarmList();

export const _AnomalyAlarmList = [...Array(AnomalyAlarmData.alert_list.length)].map((_, index) => ({
  id: `${index}`,
  count: AnomalyAlarmData.alert_list[index].count,
  latest_time: AnomalyAlarmData.alert_list[index].latest_time,
  hourly_eventtime: AnomalyAlarmData.alert_list[index].hourly_eventtime,
  useridentity_username: AnomalyAlarmData.alert_list[index].useridentity_username,
  eventname: AnomalyAlarmData.alert_list[index].eventname,
  eventsource: AnomalyAlarmData.alert_list[index].eventsource,
  detection: Array.isArray(AnomalyAlarmData.alert_list[index].detection)
    ? AnomalyAlarmData.alert_list[index].detection.join(',') // 배열인 경우 문자열로 합침
    : AnomalyAlarmData.alert_list[index].detection, // 배열이 아닌 경우 그대로 사용
  csp: AnomalyAlarmData.alert_list[index].csp,
  unique_sourceipaddress: AnomalyAlarmData.alert_list[index].unique_sourceipaddress
}));