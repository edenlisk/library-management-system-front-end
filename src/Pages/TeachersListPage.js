import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
useGetTeachersQuery,
useCreateTeacherMutation,
useDeleteTeacherMutation
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
  CircularProgress 
} from "@mui/material";
import Status from "../components/Status";
import {
  ChevronRightOutlined,
  CloseOutlined,
  DeleteOutlined,
  ModeEditOutlined,
} from "@mui/icons-material";
import AddteacherForm from "../components/teachersComponents/AddTeacherForm";
import Customtoolbar from "../components/Customtoolbar";
import ReceiveBook from "../components/books components/ReceiveBook";
import {toast} from "react-toastify";

const TeacherListPage = () => {
  const academicYear = useSelector((state) => state.global.academicYear);

  const { classId } = useParams();

  const [createNewTeacher, {isSuccess:isCreateSuccess, isError:isCreateError, error:createError,isLoading:isSending}] =useCreateTeacherMutation();

  useEffect(() => {
    if (isCreateSuccess) {
      toast.success("Teacher created successfully")
    } else if (isCreateError) {
      const { data:fullError } = createError;
      const {message} = fullError;
      toast.error(message);
    }
  }, [isCreateError, isCreateSuccess]);
  const [deleteTeacher, {isSuccess:isDeleteSuccess, isError:isDeleteError, error:deleteError,isLoading:isDeleting}] = useDeleteTeacherMutation();
  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success("Teacher deleted successfully")
    } else if (isDeleteError) {
      const { data:fullError } = deleteError;
      const {message} = fullError;
      toast.error(message);
    }
  }, [isDeleteError, isDeleteSuccess]);

  const { data, isLoading, isSuccess, isError, error } = useGetTeachersQuery();
//   const{data:classInfo,isSuccess:isDone}=useGetOneClassQuery(classId);


  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  // TO BE TAKEN IN THE STUDENT TABLE PAGE WILL NOT STAY IN HERE

  // TO HANDLE ROW DELETION

  const handleClickOpenDeleteModal = (id,name) => {
    setSelectedId(id);
    setSelectedTeacher(name);
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };
  // FETCHING STUDENTS LIST

  // ADDING NEW STUDENT

  let className="";
//   if (isDone) {
//     const { data:classData } = classInfo;
//     const { selectedClass} = classData;
//     console.log(classInfo);
//     className=selectedClass.name;
//   }

  let rows = [];
  if (isLoading) {
    console.log("loading");
  }
  if (isError) {
    console.log(`the api provided error: ${error}`);
  }
  if (isSuccess) {
    const { data: teachersdata } = data;
    const { teachers } = teachersdata;
    console.log(teachersdata);
    rows = teachers
    ;
  }
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    registrationNumber: "",
  });

  const handleChange = (e) => {
    setNewTeacher({ ...newTeacher, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = { ...newTeacher };
    await createNewTeacher({ ...newTeacher, body});
    console.log(newTeacher);
    setNewTeacher({ name: "", registrationNumber: ""});
    handleClose();
  };
  const handleRowDelete = async () => {
    const teacherId = selectedId;
    await deleteTeacher(teacherId);
    handleCloseDeleteModal();
    console.log(teacherId);
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
                <IconButton
                  aria-label="delete"
                  variant="contained"
                  size="small"
                  onClick={() => handleClickOpenDeleteModal(params.row._id,params.row.name)}
                >
                  <DeleteOutlined sx={{ fontSize: 21 }} />
                </IconButton>
              </Tooltip>
              <Link to={`/teachers/${params.row._id}`}>
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
              <Link to={`/teachers/teachers-rentals/${params.row._id}`}>
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
      <Grid2 container spacing={2} flexDirection="column" p="10px 10px 10px ">
        <Grid2
          xs={12}
          display="flex"
          justifyContent="end"
          alignItems="center"
          
        >

          <AddteacherForm
            newTeacher={newTeacher}
            setNewTeacher={setNewTeacher}
            onSubmit={handleSubmit}
            handleChange={handleChange}
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            isSending={isSending}
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
            // components={{
            //   Toolbar: () => <Customtoolbar classId={classId} />,
            // }}
            // slots={{ toolbar: Customtoolbar }}
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
                {`Sure you want to delete data in row ${selectedTeacher}`}
              </Typography>
              <Box display="flex" gap={2} sx={{ alignSelf: "center" }}>
               {isDeleting? <Button
                  variant="contained"
                  size="medium"
                  type="button"
                  disabled
                  startIcon={ <CircularProgress size={20}/>}
                  sx={{ mb: 2, width: "200px", alignSelf: "start" }}
                >
                deleting
                </Button>:<Button
                  variant="contained"
                  size="medium"
                  type="button"
                  sx={{ mb: 2, width: "200px", alignSelf: "start" }}
                  onClick={handleRowDelete}
                >
                 delete
                </Button>}
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

export default TeacherListPage;
