import { useEffect, useMemo, useState } from 'react';

import PropTypes from 'prop-types';

import { Tree, AnimatedTree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import { fNumber } from 'src/utils/format-number';

import Chart, { useChart } from 'src/components/chart';

import { getAwsTreeData } from 'src/_mock/_aws';
import { filter } from 'lodash';

// ----------------------------------------------------------------------

export default function AnalyticsPermissionTreeChart({ title, subheader, chart, ...other }) {
  const mock_data = {
    name: 'Parent',
    children: [
      {
        name: 'Child One',
        children: [
          {
            name: 'Grandchild One',
          },
          {
            name: 'Grandchild Two',
          },
        ],
      },
      {
        name: 'Child Two',
      },
    ],
  };
  const [data, setData] = useState([
    {
      name: 'ec2',
      children: [
        {
          name: 'Child One',
          children: [
            {
              name: 'Grandchild One',
            },
            {
              name: 'Grandchild Two',
            },
          ],
        },
        {
          name: 'Child Two',
        },
      ],
    },
  ]);
  useEffect(() => {
    async function _getTreeData() {
      await getAwsTreeData().then((res) => {
        setData(res);
        return res;
      });
    }
    _getTreeData();
  }, []);
  // console.info('base data', data);
  // console.info('fine data', {
  //   name: 'aws',
  //   children: data,
  // });
  // try {
  //   console.info(
  //     'ec2 only',
  //     data.find((i) => i.name === 'ec2')
  //   );
  // } catch (e) {
  //   console.error(e);
  // }

  console.info(
    'ec2 only',
    data.find((i) => i.name === 'ec2')
  );
  const [filteredTreeData, setFilteredTreeData] = useState(mock_data);
  useEffect(() => {
    setFilteredTreeData(data.find((i) => i.name === 'ec2'));
  }, [data]);
  // const data = useMemo(() => getAwsTreeData());

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }}>
        {/* <Tree data={data} height={400} width={400} /> */}
        <AnimatedTree
          // data={{
          //   name: 'aws',
          //   children: data,
          // }}
          data={data.find((i) => i.name === 'ec2')}
          // data={mock_data}
          height={3000}
          width={800}
        />
      </Box>
    </Card>
  );
}

AnalyticsPermissionTreeChart.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
