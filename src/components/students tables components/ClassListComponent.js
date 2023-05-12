import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import IconButton from '@mui/material/IconButton';
import Stack from "@mui/material/Stack";
// import { Box } from '@mui/material';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import Button from "@mui/material/Button";
import { Box, Typography, useTheme, Modal, Fade } from "@mui/material";
import Status from "../Status";
import { Link } from "react-router-dom";
import { ChevronRightOutlined, CloseOutlined } from "@mui/icons-material";
import AddStudentForm from "./AddStudentForm";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const ClassList = ({
  rows,
  className,
  newStudent,
  onSubmit,
  handleChange,
  setNewStudent,
  handleRowDelete,
}) => {
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

  const columns = [
    { field: "firstName", headerName: "First name", flex: 0.5},
    {
      field: "secondName",
      headerName: "Second Name",
      flex:0.5,
      editable: true,
    },
    { field: "location", headerName: "Location", flex: 0.5},
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => {
        // TO DELETE LATER
        const rowId=params.row.id;
        return (
          <Stack direction="row" spacing={1}>
            {/* icons only */}
            {/* <IconButton aria-label="delete">
      <DeleteOutlinedIcon sx={{fontSize:20}} />
    </IconButton>
    <IconButton  aria-label="edit"
     onClick={() => {
      console.log(`Button clicked for row ${params.id}`);
    }}>
      <ModeEditOutlinedIcon sx={{fontSize:20}} />
    </IconButton> */}
            {/* buttons with icons and text */}
            <Button
              variant="contained"
              size="small"
              startIcon={<DeleteOutlinedIcon sx={{ fontSize: 15 }} />}
              onClick={() => handleClickOpenDeleteModal(params.id)}
            >
              Delete
            </Button>
            <Link to={`/edit/${rowId}`}>
              <Button
                variant="contained"
                size="small"
                startIcon={<ModeEditOutlinedIcon sx={{ fontSize: 15 }} />}
              >
                Edit
              </Button>
              {/* TO DELETE LATER */}
            </Link>
          </Stack>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex:0.5,
      renderCell: (params) => <Status />,
    },
    {
      field: "details",
      headerName: "Details",
      flex:0.5,
      renderCell: (params) => (
        <Link to={`/details/${params.row.id}`}>
          <ChevronRightOutlined />
        </Link>
      ),
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
            onSubmit={onSubmit}
            handleChange={handleChange}
          />
        </Grid2>
      </Grid2>

      <div style={{ maxWidth: "99%", margin: "auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
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
      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        open={openDeleteModal}
        aria-labelledby="add-modal-title"
        aria-describedby="add-modal-description"
      >
        <Fade in={openDeleteModal}>
          <Box maxWidth={700} height="100%" margin="auto" padding={3}>
            <Box
              component="form"
              display="flex"
              flexDirection="column"
              justifyContent="top"
              alignItems="center"
              height="40%"
              sx={{ p: "10px 10px" }}
              backgroundColor={theme.palette.primary[900]}
              onSubmit={onSubmit}
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
