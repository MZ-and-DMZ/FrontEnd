import { Helmet } from 'react-helmet-async';

import { AnomalyAlarmListView } from 'src/sections/anomalyAlarm/view';

// ----------------------------------------------------------------------

export default function AnomalyAlarmListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Anomaly Detection Alarm List</title>
      </Helmet>

      <AnomalyAlarmListView />
    </>
  );
}
