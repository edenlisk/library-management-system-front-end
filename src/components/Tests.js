import React, { useState } from "react";
// import {
//   DataGrid,
// //   GridToolbar,
//   GridToolbarContainer,
//   GridToolbarExport,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
// } from "@material-ui/core";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useGetClassesQuery } from "../states/apiSlice";
import { Box, Typography, Button, Menu, MenuItem,FormControl,Select,InputLabel } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";

// ACTION USED TO STORE YEAR
import { setAcademicYear } from "../states/slice";


// const rows = [
//   { id: 1, name: "John", age: 25, email: "john@example.com" },
//   { id: 2, name: "Jane", age: 30, email: "jane@example.com" },
// ];

// const columns = [
//   { field: "name", headerName: "Name", width: 150 },
//   { field: "age", headerName: "Age", width: 150 },
//   { field: "email", headerName: "Email", width: 250 },
// ];

// const CustomToolbar = () => {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarExport />
//     </GridToolbarContainer>
//   );
// };

// const CustomRow = ({ row }) => {
//   const [expanded, setExpanded] = useState(false);

//   const handleExpand = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <Accordion expanded={expanded}>
//       <AccordionSummary
//         expandIcon={<ExpandMoreIcon />}
//         onClick={handleExpand}
//       >
//         <Typography>{row.name}</Typography>
//       </AccordionSummary>
//       <AccordionDetails>
//         <Typography>
//           Age: {row.age}, Email: {row.email}
//         </Typography>
//       </AccordionDetails>
//     </Accordion>
//   );
// };

const columns = [
  // {
  //   field:`_id`,
  //   headerName:"Id",
  //   flex:1
  // },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "category",
    headerName: "Category",
    flex: 1,
  },
  {
    field: "numberOfStudents",
    headerName: "Number of Students",
    flex: 1,
  },
  {
    field: "academicYear",
    headerName: "Academic Year",
    flex: 1,
  },
];
const Tests = () => {

  //  DISPATCH TO DISPATCH FOR SETTING YEAR

  const dispatch=useDispatch();

  //FUNCTION FOR THE MENU LIST

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // SELECT COMPONENT STATE

  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const handleChange = (event) => {
    setSelectedAcademicYear(event.target.value);
    
  };
  console.log(selectedAcademicYear);

  // TESTING DATA FETCH TO BE EXPORTED LATER TO CLASSLISTPAGE
  const { data, isLoading, isSuccess, isError, error } =
    useGetClassesQuery(selectedAcademicYear);
  console.log(data);
  let rows = [];
  if (isLoading) {
    console.log("loading");
  }
  if (isError) {
    console.log(`the api provided error: ${error}`);
  }
  if (isSuccess) {
    const { data: classes } = data;
    const { classes: klasses } = classes;
    rows = klasses;
    // rows.forEach(element => {
    //   element.studentNumber=element.students.length;
    // });
    console.log(rows);
    // console.log(rows.numberOfStudents)
  }

  return (
    // <div style={{ height: 400, width: "100%" }}>
    //   <DataGrid
    //     rows={rows}
    //     columns={columns}
    //     components={{
    //       Toolbar: CustomToolbar,
    //       Row: CustomRow,
    //     }}
    //   />
    // </div>
    <>
      <Typography variant="h5">we are testing....</Typography>
      <Box height="500px" width="100%">
        {/* BUTTON YTO OPEN MENU */}
        <Button
          id="gauge-button"
          aria-controls={open ? "user-menu" : undefined}
          aria-haspopup="false"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Dashboard
        </Button>
        {/* MENU LIST ITEM TO GO ON GAUGE */}
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "gauge-button",
          }}
          sx={{
            "& .MuiList-root": {
              backgroundColor: "",
            },
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
        <DataGrid
          loading={isLoading || !rows}
          getRowId={(row) => row._id}
          rows={rows}
          columns={columns}
        />
           <FormControl sx={{width:"300px"}}> 
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedAcademicYear}
          label="Age"
          onChange={ (event) => {
            setSelectedAcademicYear(event.target.value);
            dispatch(setAcademicYear(selectedAcademicYear))
            console.log(selectedAcademicYear)
            
            }}
        >
           <MenuItem value="2023-2024">
                    <em>five</em>
                  </MenuItem>
          <MenuItem value="2023-2024">2023-2024</MenuItem>
          <MenuItem value="2024-2025">2024-2025</MenuItem>
          <MenuItem value="2025-2026">2025-2026</MenuItem>
        </Select>
      </FormControl>
      </Box>
    </>
  );
};

export default Tests;
