import { Card } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import UserMultiTable from 'src/_user/user-multi-table';
import UserNewEditForm from 'src/_user/user-new-edit-form';

import PositionMultiTable from 'src/components/custom/position-multi-table/position-multi-table';
// ----------------------------------------------------------------------

/**
 *
 * @param {object} convertPosition
 * @param {string} convertPosition.id
 * @param {string} convertPosition.positionName
 * @param {string} convertPosition.description
 * @param {string} convertPosition.csp
 * @param {List} convertPosition.policies - List of Policy Name
 * @returns
 */
export default function PositionNewEditFormTable() {
  // const currentPosition = useSelector((state) => state.positionSelectedRow);
  return (
    <Card sx={{ p: 3 }}>
      <PositionMultiTable />
    </Card>
  );
}

// PositionNewEditFormTable.propTypes = {
//   currentPosition: PropTypes.object,
// };
