import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import IconButton from '@mui/material/IconButton';
// import Stack from "@mui/material/Stack";
// import { Box } from '@mui/material';
// import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
// import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
// import Button from "@mui/material/Button";
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
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   flex: 0.5,
    //   renderCell: (params) => {
    //     // TO DELETE LATER
    //     const rowId=params.row.id;
    //     return (
    //       <Stack direction="row" spacing={1}>
    //         {/* icons only */}
    //         {/* <IconButton aria-label="delete">
    //   <DeleteOutlinedIcon sx={{fontSize:20}} />
    // </IconButton>
    // <IconButton  aria-label="edit"
    //  onClick={() => {
    //   console.log(`Button clicked for row ${params.id}`);
    // }}>
    //   <ModeEditOutlinedIcon sx={{fontSize:20}} />
    // </IconButton> */}
    //         {/* buttons with icons and text */}
    //         <Button
    //           variant="contained"
    //           size="small"
    //           startIcon={<DeleteOutlinedIcon sx={{ fontSize: 15 }} />}
    //           onClick={() => handleClickOpenDeleteModal(params.id)}
    //         >
    //           Delete
    //         </Button>
    //         <Link to={`/edit/${rowId}`}>
    //           <Button
    //             variant="contained"
    //             size="small"
    //             startIcon={<ModeEditOutlinedIcon sx={{ fontSize: 15 }} />}
    //           >
    //             Edit
    //           </Button>
    //           {/* TO DELETE LATER */}
    //         </Link>
    //       </Stack>
    //     );
    //   },
    // },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   flex:0.5,
    //   renderCell: (params) => <Status />,
    // },
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
      </div>
     
    </Box>
  );
};

export default ClassNames;
