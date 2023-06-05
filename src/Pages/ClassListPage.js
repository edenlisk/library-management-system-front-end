import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  useCreateStudentMutation,
  useDeleteStudentMutation,
  useGetOneClassQuery,
  useGetStudentsQuery,
} from "../states/apiSlice";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Box,
  Typography,
  useTheme,
  Modal,
  Fade,
  IconButton,
  Tooltip,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import Status from "../components/Status";
import {
  ChevronRightOutlined,
  CloseOutlined,
  DeleteOutlined,
  ModeEditOutlined,
} from "@mui/icons-material";
import AddStudentForm from "../components/students tables components/AddStudentForm";
import Customtoolbar from "../components/Customtoolbar";
import { toast } from "react-toastify";

const ClassListPage = () => {
  const academicYear = useSelector((state) => state.global.academicYear);

  const { classId } = useParams();

  const [
    createNewStudent,
    {
      isSuccess: isCreateSuccess,
      isError: isCreationError,
      error: creationError,
      isLoading: isSending,
    },
  ] = useCreateStudentMutation();

  const [
    deleteStudent,
    {
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deletionError,
      isLoading: isDeleting,
    },
  ] = useDeleteStudentMutation();

  const { data, isLoading, isSuccess, isError, error } = useGetStudentsQuery({
    academicYear,
    classId,
  });

  const { data: classInfo, isSuccess: isDone } = useGetOneClassQuery(classId);

  const [newStudent, setNewStudent] = useState({
    name: "",
    registrationNumber: "",
  });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isCreateSuccess) {
      toast.success("Student created successfully!");
    } else if (isCreationError) {
      const { data: fullError } = creationError;
      const { message } = fullError;
      toast.error(message);
    }
  }, [isCreationError, isCreateSuccess]);

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success("Student deleted successfully");
    } else if (isDeleteError) {
      const { data: fullError } = deletionError;
      const { message } = fullError;
      toast.error(message);
    }
  }, [isDeleteSuccess, isDeleteError]);

  let className = "";
  if (isDone) {
    const { data: classData } = classInfo;
    const { selectedClass } = classData;
    console.log(classInfo);
    className = selectedClass.name;
  }

  let rows = [];

  if (isSuccess) {
    const { data: students } = data;
    const { result } = students;
    rows = result;
  }

  const capitalizeSentence = (sentence) =>(
  sentence
    .toLowerCase()
    .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase())
  );
  
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };
  const handleClickOpenDeleteModal = (id, name) => {
    setSelectedId(id);
    setSelectedName(name);
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]:e.target.name === "name" ? capitalizeSentence(e.target.value) : e.target.value});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createNewStudent({ ...newStudent, academicYear, classId });
    setOpen(!open);
    console.log(newStudent);
    setNewStudent({ name: "", registrationNumber: ""});
  };

  const handleRowDelete = async () => {
    const studentId = selectedId;
    await deleteStudent({ academicYear, classId, studentId });
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
                  onClick={() =>
                    handleClickOpenDeleteModal(params.row._id, params.row.name)
                  }
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
            {className}
          </Typography>

          <AddStudentForm
            newStudent={newStudent}
            setNewStudent={setNewStudent}
            onSubmit={handleSubmit}
            handleChange={handleChange}
            open={open}
            isSending={isSending}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        </Grid2>
      </Grid2>
      {/* DATA GRID TABLE */}
      <div style={{ maxWidth: "99%", margin: "auto", overflowX: "auto" }}>
        <div style={{ width: "100%", overflowX: "auto" }}>
          <DataGrid
            rows={rows}
            loading={isLoading || !rows}
            columns={columns}
            getRowId={(row) => row._id}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            autoHeight
            components={{
              Toolbar: () => <Customtoolbar classId={classId} />,
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
              borderRadius="12px"
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
                {`Sure you want to delete student ${selectedName}`}
              </Typography>
              <Box display="flex" gap={2} sx={{ alignSelf: "center" }}>
                {isDeleting ? (
                  <Button
                    variant="contained"
                    size="medium"
                    type="button"
                    disabled
                    startIcon={<CircularProgress size={20} />}
                    sx={{ mb: 2, width: "200px", alignSelf: "start" }}
                  >
                    deleting
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="medium"
                    type="button"
                    sx={{ mb: 2, width: "200px", alignSelf: "start" }}
                    onClick={handleRowDelete}
                  >
                    delete
                  </Button>
                )}
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

export default ClassListPage;
