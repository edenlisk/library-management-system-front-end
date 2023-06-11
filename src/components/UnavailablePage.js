import React from "react";
import { Typography, Box } from "@mui/material";

const UnavailablePage = () => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography>Not Authorized</Typography>
    </Box>
  );
};

export default UnavailablePage;
