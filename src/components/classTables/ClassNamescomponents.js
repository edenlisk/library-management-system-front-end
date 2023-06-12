import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography, useTheme, Modal, Fade, IconButton } from "@mui/material";
// import Status from "../Status";
import { Link } from "react-router-dom";
import { ChevronRightOutlined, CloseOutlined } from "@mui/icons-material";
// import AddStudentForm from "./AddStudentForm";
import AddClassForm from "./AddClassform";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const ClassNames = ({
  rows,
  className,
  newClass,
  components,
  onSubmit,
  handleChange,
  setNewClass,
  loading,
  isSending,
  handleRowDelete,
  handleOpen,
  handleClose,
  open
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
    { field: "name", headerName: "Class Name", flex: 0.3 },
    {
      field: "category",
      headerName: "Academic Level",
      flex: 0.5,
      editable: true,
    },
    { field: "numberOfStudents", headerName: "Number of students", flex: 0.3 },
    { field: "academicYear", headerName: "Academic Year", flex: 0.3 },

    {
      field: "details",
      headerName: "Details",
      flex: 0.2,
      renderCell: (params) => (
        <Link to={`/students/${params.row._id}`}>
          <IconButton>
          <ChevronRightOutlined />
          </IconButton>
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

          <AddClassForm
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
            newClass={newClass}
            setNewClass={setNewClass}
            isSending={isSending}
            onSubmit={onSubmit}
            handleChange={handleChange}
          />
        </Grid2>
      </Grid2>

      <div style={{ maxWidth: "99%", margin: "auto" }}>
        <DataGrid
          loading={loading}
          getRowId={(row) => row._id}
          rows={rows}
          columns={columns}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          autoHeight
          components={components}
          initialState={{
            ...rows.initialState,
            pagination: { paginationModel: { pageSize: 8 } },
          }}
          pageSizeOptions={[8, 16, 24]}
          item="true"
        />
      </div>
     
    </Box>
  );
};

export default ClassNames;
