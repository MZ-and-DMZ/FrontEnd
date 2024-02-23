import { Helmet } from 'react-helmet-async';

import { AnomalyAnalyticsView } from 'src/sections/anomalyAlarm/view';

// ----------------------------------------------------------------------

export default function AnomalyAlarmAnalyticsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Anomaly Detection Alarm analytics</title>
      </Helmet>

      <AnomalyAnalyticsView />
    </>
  );
}
