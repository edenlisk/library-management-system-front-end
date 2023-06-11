import React from "react";
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
import { MyResponsivePie, MyResponsiveLine } from "./dashboard/Graphs";
import TopBooks from "./dashboard/TopBooks";
import {
  ChevronRightOutlined,
  CloseOutlined,
  DeleteOutlined,
  ModeEditOutlined,
  DownloadOutlined,
  PersonAdd,
  Email,
  PointOfSale,
  Traffic,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import StatBox from "./StatBox";
import Header from "./Header";
import FlexBetween from "./FlexBetween";
import { useTopStudentsQuery } from "../states/apiSlice";
// import MyResponsiveLine from './Datachart';
import TopStudents from "./dashboard/TopStudents";
import DashboardStats from "./dashboard/DashboardStats";
import LastCreated from "./dashboard/LastCreated";

const Dashboard = () => {
  const theme = useTheme();

  const isNonMediumScreens = useMediaQuery("(min-width:1200px)");

  const academicYear = useSelector((state) => state.global.academicYear);

  const { data, isLoading, isSuccess } = useTopStudentsQuery("2023-2024");

  let rows = [];
  if (isSuccess) {
    const { data: topData } = data;
    const { result } = topData;
    rows = result;
  }

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
    <>
      <Box p="16px 16px">
        <FlexBetween>
          <Header title="DASHBOARD" subtitle="Welcome to Lycee De Kigali Library Management System" />
          {/*<Box>*/}
          {/*  <Button*/}
          {/*    sx={{*/}
          {/*      backgroundColor: theme.palette.secondary.light,*/}
          {/*      color: theme.palette.background.alt,*/}
          {/*      fontSize: "14px",*/}
          {/*      fontWeight: "bold",*/}
          {/*      padding: "10px 20px",*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <DownloadOutlined sx={{ mr: "10px" }} />*/}
          {/*    Download Reports*/}
          {/*  </Button>*/}
          {/*</Box>*/}
        </FlexBetween>
        <Box>
          <DashboardStats />
        </Box>
        <Box
          display="flex"
          justifyContent="space-around"
          flexDirection="column"
        >
          <Box
            display="flex"
            maxWidth="40%"
            height="400px"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            alignSelf="end"
          >
            <Typography>Previous week stats</Typography>
            <MyResponsivePie />
          </Box>
          <Box height="500px" m="2rem 0" width="90%">
            <Typography>Overall Statistics</Typography>
            <MyResponsiveLine />
          </Box>
        </Box>
        <Box display="flex" maxWidth="93%" justifyContent="space-around">
          <TopBooks />
          <TopStudents />
        </Box>
        <Box display="flex" justifyContent={"start"}>
          <LastCreated />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
