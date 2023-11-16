import { Card } from '@mui/material';
import PropTypes from 'prop-types';

import UserMultiTable from 'src/_user/user-multi-table';
import UserNewEditForm from 'src/_user/user-new-edit-form';

// ----------------------------------------------------------------------

/**
 *
 * @param {List} currentPosition - Positon Name List
 */
export default function PositionNewEditFormTable({ currentPosition }) {
  return (
    <Card sx={{ p: 3 }}>
      <UserMultiTable currentUser={currentPosition} />
    </Card>
  );
}

PositionNewEditFormTable.propTypes = {
  currentPosition: PropTypes.object,
};
