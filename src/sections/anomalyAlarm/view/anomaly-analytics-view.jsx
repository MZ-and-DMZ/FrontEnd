import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Scrollbar from 'src/components/scrollbar';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';


import {
  _analyticTasks,
  _analyticPosts,
  _analyticTraffic,
  _analyticOrderTimeline,
} from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

// import AnalyticsNews from '../analytics-news';
// import AnalyticsTasks from '../analytics-tasks';
// import AnalyticsCurrentVisits from '../analytics-current-visits';
// import AnalyticsOrderTimeline from '../analytics-order-timeline';
import AnalyticsWebsiteVisits from '../analytics-website-visits';
// import AnalyticsWidgetSummary from '../analytics-widget-summary';
// import AnalyticsTrafficBySite from '../analytics-traffic-by-site';
// import AnalyticsCurrentSubject from '../analytics-current-subject';
// import AnalyticsConversionRates from '../analytics-conversion-rates';
// import AnalyticsPermissionTreeChart from '../analytics-permission-tree-chart';

// ----------------------------------------------------------------------

export default function AnomalyAnalyticsView() {
  const settings = useSettingsContext();

  const time_label = [
    '01/01/2022',
    '02/01/2022',
    '03/01/2022',
    '04/01/2022',
    '05/01/2022',
    '06/01/2022',
    '07/01/2022',
    '08/01/2022',
    '09/01/2022',
    '10/01/2022',
    '11/01/2022',
    '12/01/2022',
    '01/01/2023',
    '02/01/2023',
    '03/01/2023',
    '04/01/2023',
    '05/01/2023',
    '06/01/2023',
    '07/01/2023',
    '08/01/2023',
    '09/01/2023',
    '10/01/2023',
    '11/01/2023',
  ];

  const graph_data = [64, 75, 81, 87, 92, 93, 95, 97, 100, 120, 130,
    64, 75, 81, 87, 92, 93, 95, 97, 100, 120, 130];
  // const last_graph_data = [23, 11, 22, 27, 13, 22, 15, 21, 44, 22, 30];
  const ip_graph_data = [23, 11, 12, 27, 13, 2, 15, 13, 32, 22, 15,
    23, 11, 12, 27, 13, 2, 15, 13, 32, 22, 15];
  const time_graph_data = [15, 4, 20, 24, 1, 5, 11, 12, 14, 14, 2,
    15, 4, 20, 24, 1, 5, 11, 12, 14, 14, 2];
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
          heading="권한 통계"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: '이상탐지 알림', href: paths.dashboard.anomalyAlarm.root },
            { name: '통계' }, 
          ]}
        />
      {/* <Typography
        // variant="h6"
        variant="body1"
        sx={{
          // mb: { xs: 3, md: 5 },
          mb: { xs: 3, md: 5 },
        }}
      >
        Analytics, 정책의 권한 구조와 최적화 관련 통계를 볼 수 있습니다.
      </Typography> */}

      {/* <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="신규 권한 요청"
            total={714}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="신규 사용자"
            total={135}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="신규 권한 승인"
            total={652}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="권한 삭제"
            total={23264}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid> */}
        <Grid xs={12} md={6} lg={12} style={{ overflowX: 'auto' }}>
          <AnalyticsWebsiteVisits
            // title="권한 통계"
            // subheader="(+43%) than last year"
            chart={{
              labels: time_label,
              series: [
                {
                  name: '탐지된 이상행위 수(IP)',
                  type: 'column',
                  fill: 'solid',
                  // data: [23, 11, 22, 27, 13, 22, 15, 21, 44, 22, 30],
                  // data: ip_graph_data.map((item, index) => item * (11 - index).toFixed(0)),
                  data: ip_graph_data,
                },
                {
                  name: '탐지된 이상행위 수(시간)',
                  type: 'column',
                  fill: 'solid',
                  // data: [23, 11, 22, 27, 13, 22, 15, 21, 44, 22, 30],
                  data: time_graph_data,
                },
                {
                  name: '전체 활동 수',
                  // type: 'area',
                  type: 'area',
                  fill: 'gradient',
                  data: graph_data,
                },
                {
                  name: '전체 이상행위 수',
                  // type: 'line',
                  type: 'area',
                  // fill: 'solid',
                  fill: 'gradient',
                  // data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  // 탐지된 이상행위 수 IP와 시간을 더하기
                  data: ip_graph_data.map((item, index) =>
                    (item  + time_graph_data[index])
                  ),
                },
              ],
            }}
          />
          

        </Grid>

    </Container>
  );
}
