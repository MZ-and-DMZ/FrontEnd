import { useEffect, useMemo, useState } from 'react';

import PropTypes from 'prop-types';

import { Tree, AnimatedTree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';

import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import { fNumber } from 'src/utils/format-number';

import Chart, { useChart } from 'src/components/chart';

import { getAwsTreeData } from 'src/_mock/_aws';

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

  const mock_data2 = {
    name: 'ec2',
    children: [
      {
        name: '인스턴스',
        children: [
          {
            name: 'Create',
            children: [
              { name: 'ec2:ImportInstance' },
              { name: 'ec2:RunInstances' },
              { name: 'ec2:StartInstances' },
            ],
          },
          {
            name: 'Update',
            children: [
              { name: 'ec2:DescribeFleetInstances' },
              { name: 'ec2:DescribeInstanceTopology' },
              { name: 'ec2:DescribeReservedInstancesListings' },
              { name: 'ec2:DescribeReservedInstancesModifications' },
              { name: 'ec2:DescribeReservedInstancesOfferings' },
              { name: 'ec2:GetInstanceUefiData' },
              { name: 'ec2:DescribeInstanceAttribute' },
              { name: 'ec2:DescribeInstances' },
            ],
          },
          {
            name: 'Read',
            children: [
              { name: 'ec2:ConfirmProductInstance' },
              { name: 'ec2:ModifyInstanceMetadataOptions' },
              { name: 'ec2:ModifyInstanceMaintenanceOptions' },
              { name: 'ec2:BundleInstance' },
              { name: 'ec2:ModifyInstanceEventStartTime' },
              { name: 'ec2:ModifyInstanceAttribute' },
              { name: 'ec2:ResetInstanceAttribute' },
              { name: 'ec2:MonitorInstances' },
              { name: 'ec2:RebootInstances' },
              { name: 'ec2:StopInstances' },
              { name: 'ec2:UnmonitorInstances' },
              { name: 'ec2:ModifyInstancePlacement' },
            ],
          },
          {
            name: 'Delete',
            children: [{ name: 'ec2:TerminateInstances' }],
          },
        ],
      },
    ],
  };
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
      <TextField defaultValue="Ec2FullAccess">Ec2FullAccess</TextField>
      <Box sx={{ mx: 3 }}>
        {/* <Tree data={data} height={400} width={400} /> */}
        <AnimatedTree
          // data={{
          //   name: 'aws',
          //   children: data,
          // }}
          // data={data.find((i) => i.name === 'ec2')}
          data={mock_data2}
          height={1000}
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
