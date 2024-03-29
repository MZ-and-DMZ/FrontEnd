import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _userList } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import GroupNewEditForm from '../group-new-edit-form';

// ----------------------------------------------------------------------

export default function GroupEditView({ id }) {
  const settings = useSettingsContext();

  const currentUser = _userList.find((user) => user.id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'User',
            href: paths.dashboard.user.root,
          },
          { name: currentUser?.userName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <GroupNewEditForm currentUser={currentUser} />
    </Container>
  );
}

GroupEditView.propTypes = {
  id: PropTypes.string,
};
