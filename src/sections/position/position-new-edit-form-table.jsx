import { Card } from '@mui/material';
import PropTypes from 'prop-types';

import PositionMultiTable from 'src/_user/position-multi-table';
import UserNewEditForm from 'src/_user/user-new-edit-form';

export default function PositionNewEditFormTable({ currentPosition }) {
  return (
    <Card sx={{ p: 3 }}>
      <PositionMultiTable currentUser={currentPosition} />
    </Card>
  );
}

PositionNewEditFormTable.propTypes = {
  currentPosition: PropTypes.object,
};
