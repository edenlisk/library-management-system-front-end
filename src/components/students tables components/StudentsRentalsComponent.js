import { ChevronLeft } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import PropTypes from "prop-types";
import StudentsTableRentals from "./StudentsTableRentals";
import AddBookRental from "./AddBookRental";
import { useNavigate } from "react-router-dom";
// import dummyBooks from './dummyBooks'

// const rows=dummyBooks

const StudentsRentalsComponent = ({ studentName, rows,rental,setRental,onSubmit,handleChange,handleStartDateChange,handleEndDateChange }) => {
  const navigate = useNavigate();
  return (
    <Grid2
      container
      flexDirection="column"
      disableEqualOverflow
      spacing={2}
      padding="0px 26px"
    >
      <Grid2  xs={12} display="flex" justifyContent="start">
        <ChevronLeft onClick={() => navigate(-1)} />
      </Grid2>
      <Grid2
        
        xs={12}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">{studentName}:</Typography>
        <AddBookRental 
          rental={rental}
          setRental={setRental}
          handleChange={handleChange}
          onSubmit={onSubmit}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
        />
      </Grid2>
      <Grid2  xs={12} display="flex" justifyContent="start">
        <Box
          sx={{
            width: "100%",
            height: "600px",
          }}
        >
          {/* PASSING THE ROWS AS PROPS  */}
          <StudentsTableRentals rows={rows} />
        </Box>
      </Grid2>
    </Grid2>
  );
};
StudentsRentalsComponent.propTypes = {
  studentName: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
};

export default StudentsRentalsComponent;
