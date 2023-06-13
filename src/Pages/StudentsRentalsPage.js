import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  useCreateRentalMutation,
  useDeleteRentalMutation,
  useGetOneStudentQuery,
  useGetRentalsQuery,
} from "../states/apiSlice";
import {
  ChevronLeft,
  DeleteOutlined,
  ModeEditOutlined,
  Add,
  CloseOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Tooltip,
  Button,
  Fade,
  Modal,
  CircularProgress,
} from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { DataGrid } from "@mui/x-data-grid";
import Customtoolbar from "../components/Customtoolbar";
import ReceiveBook from "../components/books components/ReceiveBook";
import { toast } from "react-toastify";

const StudentsRentalsPage = () => {
  const { studentId } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const academicYear = useSelector((state) => state.global.academicYear);

  const [book, setBook] = useState(null);
  const [open, setOpen] = useState(false);
  const [returned, setReturned] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedBkId, setSelectedBkId] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [rental, setRental] = useState({
    nameOfBook: "",
    bookId: "",
    category: "",
    studentId: studentId,
    academicYear: academicYear,
    issueDate: null,
    dueDate: null,
  });

  const [
    createRental,
    { isSuccess: isCreateSuccess, isError: isCreateError, error: createError },
  ] = useCreateRentalMutation();

  const [
    deleteRental,
    {
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
      isLoading: isDeleting,
    },
  ] = useDeleteRentalMutation();

  const { data, isLoading, isSuccess, isError, error } = useGetRentalsQuery({
    academicYear,
    studentId,
  });

  const { data: studentInfo, isSuccess: isDone, isLoading:isFetching } =
    useGetOneStudentQuery(studentId);


  useEffect(() => {
    if (isCreateSuccess) {
      toast.success("Rental created successfully!");
    } else if (isCreateError) {
      const { data: fullError } = createError;
      const { message } = fullError;
      toast.error(message);
    }
  }, [isCreateError, isCreateSuccess, createError]);

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success("Rental deleted successfully");
    } else if (isDeleteError) {
      const { data: fullError } = deleteError;
      const { message } = fullError;
      toast.error(message);
    }
  }, [isDeleteError, isDeleteSuccess, deleteError]);

  let studentName = "";
  if (isDone) {
    const { data: studentData } = studentInfo;
    const { student } = studentData;
    console.log(student.name);
    studentName = student.name;
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
    const { rentalHistory: rawRentalHistory } = rentalsinfo;
    rawRentalHistory.forEach((rent) => {
      const rental = {
        ...rent,
        issueDate: rent.issueDate.split("T")[0],
        dueDate: rent.dueDate.split("T")[0],
        returnDate: rent.returnDate ? rent.returnDate.split("T")[0] : "",
      };
      rows.push(rental);
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleShow = (bk) => {
    setBook(bk);
    handleClickOpen();
  };

  const handleClose = () => {
    setOpen(false);
    setBook(null);
  };

  const handleClickOpenDeleteModal = (id, name, bkName) => {
    setSelectedId(id);
    setSelectedName(name);
    setSelectedBkId(bkName);
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleRowDelete = async () => {
    const rentalId = selectedId;
    await deleteRental(rentalId);
    setOpenDeleteModal(!openDeleteModal);
    console.log(rentalId);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const columns = [
    { field: "nameOfBook", headerName: "Book name", flex: 0.3 },
    { field: "bookId", headerName: "ID", flex: 0.18 },
    { field: "categoryName", headerName: "category", flex: 0.2 },
    { field: "issueDate", headerName: "Issue date", flex: 0.2 },
    { field: "dueDate", headerName: "Due date", flex: 0.2 },
    { field: "returnDate", headerName: "Return date", flex: 0.2 },
    {
      field: "Receive",
      headerName: "Receive",
      flex: 0.15,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color={params.row.returned ? "success" : "info"}
            onClick={() => (params.row.returned ? "" : handleShow(params.row))}
            size="small"
          >
            {params.row.returned ? "Received" : "Receive"}
          </Button>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.15,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Delete" placement="top" arrow>
            <IconButton
              aria-label="delete"
              onClick={() =>
                handleClickOpenDeleteModal(
                  params.row._id,
                  params.row.nameOfBook,
                  params.row.bookId
                )
              }
            >
              <DeleteOutlined sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>

          <Link to={`/edit/rental/${params.id}`}>
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
        <Typography variant="h4">
          {isFetching?<Skeleton animation="wave"  sx={{ width: 400,height:40 }} />:(`${studentName}:${academicYear}`)}
        </Typography>
        <Button
          size="small"
          sx={{
            display: "flex",
            border: "solid 1.5px",
            textTransform: "none",
            color: "inherit",
            padding: "8px",
          }}
          onClick={() => navigate(`/add/student-rental/${studentId}`)}
        >
          <Add />
          Add new book rental...
        </Button>
      </Grid2>
      <Grid2 xs={12} display="flex" justifyContent="start">
        <Box
          sx={{
            width: 1,
            height: "600px",
          }}
        >
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
            loading={isLoading || !rows}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            autoHeight
            components={{
              Toolbar: () => <Customtoolbar studentId={studentId} />,
            }}
            initialState={{
              ...rows.initialState,
              pagination: { paginationModel: { pageSize: 8 } },
            }}
            pageSizeOptions={[8, 16, 24]}
            item="true"
          />
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
                    {`Sure you want to delete rental ${selectedName} with the ID: ${selectedBkId}`}
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
                        sx={{ mb: 2, width: "200px", alignSelf: "start", backgroundColor:theme.palette.buttons.main  }}
                        onClick={handleRowDelete}
                      >
                        delete
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      size="medium"
                      type="button"
                      sx={{ mb: 2, width: "200px", alignSelf: "start", backgroundColor:theme.palette.buttons.main  }}
                      onClick={handleCloseDeleteModal}
                    >
                      cancel
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Modal>
          {book ? (
            <ReceiveBook book={book} handleClose={handleClose} open={open} />
          ) : (
            <div />
          )}
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default StudentsRentalsPage;
