import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CardHeader from "@mui/material/CardHeader";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { paths } from "src/routes/paths";

import { _positionList, _roles, _mock } from "src/_mock";

import { useTable } from "src/components/table";

import { useSettingsContext } from "src/components/settings";

import { EDIT_ROWS } from "src/redux/reducer/positionSelectedSlice";

import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

// import { GetPositions } from './getPositions';
import DataGridCustom from "../data_grid_import";
import DataGridView from "../data_grid_view";
import UserNewEditForm from "../user-new-edit-form";
import UserTableToolbar from "../user-table-toolbar";

// ----------------------------------------------------------------------

const positionData = _positionList;
console.info("positionData", positionData);

const defaultFilters = {
  positionName: "",
  policies: [],
  status: "all",
};

// const defaultFilters = {
//   name: '',
//   role: [],
//   status: 'all',
// };
console.info("positionData", positionData);
const _roles2 = _positionList.map((item) => item.positionName);
console.info("_roles2", _roles2);
export default function UserCreateView() {
  // const [filters, setFilters] = useState(defaultFilters);
  const _checked = null;
  const settings = useSettingsContext();
  const [filters, setFilters] = useState(defaultFilters);

  const table = useTable();

  const handleFilters = useCallback(
    (positionName, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [positionName]: value,
      }));
    },
    [table]
  );

  // const handleFilters = useCallback(
  //   (name, value) => {
  //     table.onResetPage();
  //     setFilters((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   },
  //   [table]
  // );
  let positionSelected = null;
  positionSelected = useSelector((state) => state.positionSelected);
  const dispatch = useDispatch();
  const _dataGrid2 = [...Array(positionSelected.length)].map((_, index) => ({
    id: positionSelected[index].id,
    positionName: positionSelected[index].positionName,
    isCustom: positionSelected[index].isCustom,
    description: positionSelected[index].description,
    csp: positionSelected[index].csp,
    policies: positionSelected[index].policies,
  }));

  // const formatSelected = {
  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading="Create a new user"
        links={[
          {
            name: "Dashboard",
            href: paths.dashboard.root,
          },
          {
            name: "User",
            href: paths.dashboard.user.root,
          },
          { name: "New user" },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <UserNewEditForm />
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardHeader title="직무" sx={{ mb: 2 }} />
              {/* 필터링 위해서 */}
              <UserTableToolbar
                filters={filters}
                onFilters={handleFilters}
                roleOptions={_roles2}
              />
              <Box sx={{ height: 720 }}>
                <DataGridView data={_positionList} />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardHeader title="추가한 권한/역할" sx={{ mb: 2 }} />
              <Box sx={{ height: 720 }}>
                {/* Change _dataGrid */}
                <DataGridCustom data={_dataGrid2} />
                {/* <DataGridCustom data={_dataGrid} /> */}
              </Box>
            </Card>
          </Grid>
        </Grid>
        {/* <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!currentUser ? 'Create User' : 'Save Changes'}
          </LoadingButton>
        </Stack> */}
      </Card>
    </Container>
  );
}
