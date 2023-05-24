import React from  'react';
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Tooltip,
  Stack,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ChevronRightOutlined,
  CloseOutlined,
  DeleteOutlined,
  ModeEditOutlined,
  DownloadOutlined
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import Header from './Header';
import FlexBetween from "./FlexBetween";
import { useTopStudentsQuery } from '../states/apiSlice';
const Dashboard = () => {
  const theme=useTheme();

  const isNonMediumScreens=useMediaQuery("(min-width:1200px)");

  const academicYear = useSelector((state) => state.global.academicYear);

  const{data, isLoading, isSuccess}=useTopStudentsQuery('2023-2024');

  let rows = [];
  if (isSuccess) {
    const { data:topData } = data
    const { result } = topData;
    rows = result;
  }
    // const{results}=topData;
    // const rows=results;
  // console.log(topinfo);

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "registrationNumber",
      headerName: "ID",
      flex: 0.5,
      editable: true,
    },
    { field: "numberOfRentals", headerName: "Rentals", flex: 0.3 },
    { field: "fine", headerName: "Fine", flex: 0.2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => {
        // TO DELETE LATER

        return (
          <>
            <Stack direction="row" spacing={1}>
              <Tooltip title="Delete" placement="top" arrow>
                <IconButton
                  aria-label="delete"
                  variant="contained"
                  size="small"
                  // onClick={() => handleClickOpenDeleteModal(params.row._id)}
                >
                  <DeleteOutlined sx={{ fontSize: 21 }} />
                </IconButton>
              </Tooltip>
              <Link to={`/edit/student/${params.row._id}`}>
                <Tooltip title="Edit" placement="top" arrow>
                  <IconButton
                    aria-label="edit"
                    variant="contained"
                    size="small"
                  >
                    <ModeEditOutlined sx={{ fontSize: 21 }} />
                  </IconButton>
                </Tooltip>
                {/* TO DELETE LATER */}
              </Link>
              <Link to={`/rentals/${params.row._id}`}>
                <Tooltip title="Details" placement="top" arrow>
                  <IconButton
                    aria-label="details"
                    variant="contained"
                    size="small"
                  >
                    <ChevronRightOutlined sx={{ fontSize: 21 }} />
                  </IconButton>
                </Tooltip>
              </Link>
            </Stack>
          </>
        );
      },
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   flex: 0.3,
    //   renderCell: (params) => <Status />,
    // },
  ];
  return (
    <Box m="1.5rem 2.5rem">
    <FlexBetween>
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      <Box>
        <Button
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <DownloadOutlined sx={{ mr: "10px" }} />
          Download Reports
        </Button>
      </Box>
    </FlexBetween>

    <Box
      mt="20px"
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="160px"
      gap="20px"
      sx={{
        "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
      }}
    >
      {/* ROW 1 */}
      {/* <StatBox
        title="Total Customers"
        value={data && data.totalCustomers}
        increase="+14%"
        description="Since last month"
        icon={
          <Email
            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
          />
        }
      />
      <StatBox
        title="Sales Today"
        value={data && data.todayStats.totalSales}
        increase="+21%"
        description="Since last month"
        icon={
          <PointOfSale
            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
          />
        }
      />
      <Box
        gridColumn="span 8"
        gridRow="span 2"
        backgroundColor={theme.palette.background.alt}
        p="1rem"
        borderRadius="0.55rem"
      >
        <OverviewChart view="sales" isDashboard={true} />
      </Box>
      <StatBox
        title="Monthly Sales"
        value={data && data.thisMonthStats.totalSales}
        increase="+5%"
        description="Since last month"
        icon={
          <PersonAdd
            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
          />
        }
      />
      <StatBox
        title="Yearly Sales"
        value={data && data.yearlySalesTotal}
        increase="+43%"
        description="Since last month"
        icon={
          <Traffic
            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
          />
        }
      /> */}

      {/* ROW 2 */}
      <Box
        gridColumn="span 8"
        gridRow="span 3"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            borderRadius: "5rem",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.background.alt,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !rows}
          getRowId={(row) => row._id}
          rows={rows || []}
          columns={columns}
        />
      </Box>
      <Box
        gridColumn="span 4"
        gridRow="span 3"
        backgroundColor={theme.palette.background.alt}
        p="1.5rem"
        borderRadius="0.55rem"
      >
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          Sales By Category
        </Typography>
        {/* <BreakdownChart isDashboard={true} /> */}
        <Typography
          p="0 0.6rem"
          fontSize="0.8rem"
          sx={{ color: theme.palette.secondary[200] }}
        >
          Breakdown of real states and information via category for revenue
          made for this year and total sales.
        </Typography>
      </Box>
    </Box>
  </Box>

  )
}

export default Dashboard