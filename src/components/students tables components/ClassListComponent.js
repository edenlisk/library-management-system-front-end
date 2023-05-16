import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
// import { Box } from '@mui/material';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import Button from "@mui/material/Button";
import { Box, Typography, useTheme, Modal, Fade,IconButton,Tooltip } from "@mui/material";
import Status from "../Status";
import { Link } from "react-router-dom";
import { ChevronRightOutlined, CloseOutlined } from "@mui/icons-material";
import AddStudentForm from "./AddStudentForm";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useParams } from "react-router-dom";
// import {
//   useCreateStudentMutation,
//   useDeleteStudentMutation,
//   useGetStudentsQuery,
// } from "../states/apiSlice";
import { useCreateStudentMutation,useDeleteStudentMutation,useGetStudentsQuery } from "../../states/apiSlice";

const ClassList = () => {
  const academicYear = useSelector((state) => state.global.academicYear);

  const { classId } = useParams();

  const [createNewStudent] = useCreateStudentMutation();
  const [deleteStudent] = useDeleteStudentMutation();

  const { data, isLoading, isSuccess, isError, error } = useGetStudentsQuery({
    academicYear,
    classId,
  });

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  // TO BE TAKEN IN THE STUDENT TABLE PAGE WILL NOT STAY IN HERE

  // TO HANDLE ROW DELETION

  const handleClickOpenDeleteModal = (id) => {
    setSelectedId(id);
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };
  // FETCHING STUDENTS LIST


  // ADDING NEW STUDENT


  let rows = [];
  if (isLoading) {
    console.log("loading");
  }
  if (isError) {
    console.log(`the api provided error: ${error}`);
  }
  if (isSuccess) {
    const { data: students } = data;
    const { result } = students;
    console.log(result);
    rows = result;
  }
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };
  const [newStudent, setNewStudent] = useState({
    name: "",
    registrationNumber: "",
    academicLevel: "",
  });

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleClose();
    await createNewStudent({ ...newStudent, academicYear, classId });
    console.log(newStudent);
    setNewStudent({ name: "", registrationNumber: "", academicLevel: "" });
  };
  const handleRowDelete = async () => {
    const studentId= selectedId;
    // await deleteStudent({ academicYear, classId, studentId });
    handleCloseDeleteModal();
    console.log(studentId);
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "registrationNumber",
      headerName: "ID",
      flex: 0.5,
      editable: true,
    },
    { field: "numberOfRentals", headerName: "Rentals", flex: 0.3 },
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
              <IconButton aria-label="delete"
                variant="contained"
                size="small"
                // startIcon={<DeleteOutlinedIcon sx={{ fontSize: 15 }} />}
                onClick={() => handleClickOpenDeleteModal(params.row._id)}
              >
                  <DeleteOutlinedIcon sx={{ fontSize: 21 }} />
              </IconButton>
              </Tooltip>
              <Link to={`/edit/student/${params.row._id}`}>
              <Tooltip title="Edit" placement="top" arrow>
                <IconButton  aria-label="edit"
                  variant="contained"
                  size="small"
                  // startIcon={<ModeEditOutlinedIcon sx={{ fontSize: 15 }} />}
                >
                  <ModeEditOutlinedIcon sx={{ fontSize: 21 }} />
                </IconButton>
                </Tooltip>
                {/* TO DELETE LATER */}
              </Link>
              <Link to={`/details/${params.row._id}`}>
              <Tooltip title="Details" placement="top" arrow>
                <IconButton aria-label="details"
                  variant="contained"
                  size="small">
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

  // glitch in maximizing screen
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: 900,
        width: "100%",
        p: "20px 20px",
        overflow: "auto",
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: theme.palette.primary[800],
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: theme.palette.primary[800],
        },
        "& .MuiDataGrid-virtualScroller": {},
      }}
    >
      {/* INLINE NAME AND FORM */}
      <Grid2 container spacing={2} flexDirection="column">
        <Grid2
          xs={12}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            {`class name ${academicYear}`}
          </Typography>

          <AddStudentForm
            newStudent={newStudent}
            setNewStudent={setNewStudent}
            onSubmit={handleSubmit}
            handleChange={handleChange}
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        </Grid2>
      </Grid2>
      {/* DATA GRID TABLE */}
      <div style={{ maxWidth: "99%", margin: "auto" ,overflowX: 'auto'}}>
      <div style={{ width: "100%",overflowX: 'auto'}}>
        <DataGrid
          rows={rows}
          loading={isLoading || !rows}
          columns={columns}
          getRowId={(row) => row._id}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          autoHeight
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          initialState={{
            ...rows.initialState,
            pagination: { paginationModel: { pageSize: 8 } },
          }}
          pageSizeOptions={[8, 16, 24]}
          item="true"
        />
        </div>
      </div>
                  {/* DELETE CONFIRMATION MODAL */}
                  <Modal
              open={openDeleteModal}
              aria-labelledby="add-modal-title"
              aria-describedby="add-modal-description"
              sx={{
                "& .MuiBackdrop-root-MuiModal-backdrop": {
                  backgroundColor: `red`,
                  opacity: "0.1px",
                },
              }}
            >
              <Fade in={openDeleteModal}>
                <Box maxWidth={700} height="100%" margin="auto" padding={3}>
                  <Box
                    
                    display="flex"
                    flexDirection="column"
                    justifyContent="top"
                    alignItems="center"
                    height="40%"
                    sx={{ p: "10px 10px" }}
                    backgroundColor={theme.palette.primary[900]}
                    
                  >
                    <CloseOutlined
                      sx={{ alignSelf: "end" }}
                      onClick={handleCloseDeleteModal}
                    />
                    <Typography
                      variant="h3"
                      sx={{ textAlign: "center", mb: 3, mt: 3 }}
                    >
                      {`Sure you want to delete data in row ${selectedId}`}
                    </Typography>
                    <Box display="flex" gap={2} sx={{ alignSelf: "center" }}>
                      <Button
                        variant="contained"
                        size="medium"
                        type="button"
                        sx={{ mb: 2, width: "200px", alignSelf: "start" }}
                        onClick={handleRowDelete}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        size="medium"
                        type="button"
                        sx={{ mb: 2, width: "200px", alignSelf: "start" }}
                        onClick={handleCloseDeleteModal}
                      >
                        cancel
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </Modal>
    </Box>
  );
};

export default ClassList;
