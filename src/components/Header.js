import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ p:"0px 17px",pt:"15px" }}
      >
        {title}
      </Typography>
      <Typography variant="h4" sx={{ p:"0px 17px" }} color={theme.palette.dashboard.text}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;