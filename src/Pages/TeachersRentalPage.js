import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
//   useCreateRentalMutation,
//   useDeleteRentalMutation,
//   useGetOneStudentQuery,
//   useGetRentalsQuery,
  useGetTeacherRentalsQuery,
  useCreateTeacherRentalMutation,
  useDeleteTeacherRentalMutation,
  useGetTeacherQuery
} from "../states/apiSlice";
import {
  ChevronLeft,
  ChevronRightOutlined,
  DeleteOutlined,
  ModeEditOutlined,
} from "@mui/icons-material";
import { Box, Typography, IconButton, Stack, Tooltip } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { DataGrid } from "@mui/x-data-grid";
import Customtoolbar from "../components/Customtoolbar";
import AddTeacherBookRental from "../components/teachersComponents/AddTeacherBookRental";
import Status from "../components/Status";


const TeachersRentalsPage = () => {
  const { teacherId } = useParams();
  const theme = useTheme();

  const navigate = useNavigate();

  const academicYear = useSelector((state) => state.global.academicYear);

  const [selectedId, setSelectedId] = useState();



  const [createRental] = useCreateTeacherRentalMutation();
  const [deleteRental] = useDeleteTeacherRentalMutation();

  const { data, isLoading, isSuccess, isError, error } = useGetTeacherRentalsQuery(teacherId);

  const{data:studentInfo,isSuccess:isDone}=useGetTeacherQuery(teacherId);

let teacherName="";
  if (isDone) {
    const { data:studentData } = studentInfo;
    const { teacher } = studentData;
    console.log(teacher);
    teacherName=teacher.name;
  }

  let rows = [];
  if (isLoading) {
    console.log("loading");
  }
  if (isError) {
    console.log(`the api provided error: ${error}`);
  }
  if (isSuccess) {
    const { data: rentalsinfo } = data;
    const { teacherRentals:rawRentalHistory } = rentalsinfo;
    const rentalHistory = [];
    rawRentalHistory.forEach(rent => {
      const rental = { ...rent, issueDate: rent.issueDate.split('T')[0], dueDate: rent.dueDate.split('T')[0] }
      rentalHistory.push(rental);
    })
    // const{rentals:rentalskey}=rentalsObj;
    // const{0:rentalsvalue}=rentalskey
    // const{rentalHistory}=rentalsvalue
    console.log(rentalsinfo);
    rows = rentalsinfo;
    // console.log(data);
  }

  const [returned, setReturned] = useState(false);

  const [openModal, setOpenModal] = useState(false);



  const [rental, setRental] = useState({
    nameOfBook: "",
    numberOfBooks: "",
    rentalFor: "",
    teacherId:"",
    issueDate: null,
    dueDate: null,
  });

  const handleModalOpen = () => {
    setOpenModal(!openModal);
  };
  const handleModalClose = () => {
    setOpenModal(!openModal);
  };

  const handleChange = (e) => {
    setRental({ ...rental, [e.target.name]: e.target.value });
  };

  const handleStartDateChange = (newDate) => {
    setRental((prevState) => ({
      ...prevState,
      // issueDate: newDate.format("MM/DD/YYYY"),
      issueDate: newDate.format('YYYY-MM-DD'),
    }));
  };

  const handleEndDateChange = (newDate) => {
    setRental((prevState) => ({
      ...prevState,
      // dueDate: newDate.format("MM/DD/YYYY"),
      dueDate: newDate.format('YYYY-MM-DD'),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = { ...rental };
    await createRental( body);
    console.log(rental);
    setRental({
      nameOfBook: "",
      numberOfBooks: "",
      rentalFor: "",
      teacherId:"",
      issueDate: null,
      dueDate: null,
    });
    setOpenModal(!openModal);
  };

  const handleRowDelete = async (id) => {
    const rentalId = id;
    await deleteRental(rentalId);
    console.log(typeof rentalId);
  };

  const columns = [
    { field: "nameOfBook", headerName: "Book name", flex: 0.4 },
    { field: "numberOfBooks", headerName: "value", flex: 0.2 },
    { field: "rentalFor", headerName: "Rented For", flex: 0.3 },
    { field: "issueDate", headerName: "Issue date", flex: 0.3 },
    { field: "dueDate", headerName: "Due date", flex: 0.3 },
    { field: "returned", headerName: "Returned", flex: 0.3 },
    { field: "teacherId", headerName: "Teacher Id", flex: 0.3 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.4,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          {/* icons only */}
          <Tooltip title="Delete" placement="top" arrow>
            <IconButton
              aria-label="delete"
              onClick={() => handleRowDelete(params.id)}
            >
              <DeleteOutlined sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>

          <Link to={`/teachers-rental/${params.id}`}>
            <Tooltip title="edit" placement="top" arrow>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  console.log(`Button clicked for row ${params.id}`);
                }}
              >
                <ModeEditOutlined sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Link>
        </Stack>
      ),
    },
       {
      field: "status",
      headerName: "Status",
      flex: 0.3,
      renderCell: (params) => <Status returned={params.row.returned} />,
    },
  ];
  return (
    <Grid2
      container
      flexDirection="column"
      disableEqualOverflow
      spacing={2}
      padding="0px 26px"
    >
      <Grid2 xs={12} display="flex" justifyContent="start">
        <ChevronLeft onClick={() => navigate(-1)} />
      </Grid2>
      <Grid2
        xs={12}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">{teacherName }:{academicYear}</Typography>
        <AddTeacherBookRental
          rental={rental}
          format="YYYY-MM-DD"
          setRental={setRental}
          handleChange={handleChange}
          onSubmit={handleSubmit}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          openModal={openModal}
          handleModalOpen={handleModalOpen}
          handleModalClose={handleModalClose}
        />
      </Grid2>
      <Grid2 xs={12} display="flex" justifyContent="start">
        <Box
          sx={{
            width: 1,
            height: "600px",
          }}
        >
          {/* DATAGRID TABLE ON UI */}
          <DataGrid
            sx={{
              width: "100%",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.primary[800],
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.primary[800],
              },
              "& .MuiDataGrid-virtualScroller": {},
            }}
            columns={columns}
            rows={rows}
            getRowId={(row) => row._id}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            autoHeight
            components={{
              Toolbar: () => <Customtoolbar/>,
            }}
            // slots={{ toolbar: GridToolbar }}
            // slotProps={{
            //   toolbar: {
            //     showQuickFilter: true,
            //     quickFilterProps: { debounceMs: 500 },
            //   },
            // }}
            initialState={{
              ...rows.initialState,
              pagination: { paginationModel: { pageSize: 8 } },
            }}
            pageSizeOptions={[8, 16, 24]}
            item="true"
          />
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default TeachersRentalsPage;
