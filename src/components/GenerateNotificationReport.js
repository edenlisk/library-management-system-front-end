import React, { useState } from "react";
import { FileDownloadOutlined } from "@mui/icons-material";
import { useNotificationReportMutation } from "../states/apiSlice";
import { Box, Button, CircularProgress,useTheme } from "@mui/material";

const GenerateNotificationReport = () => {
  const theme=useTheme();
  const [notificationReport, { data, isLoading }] =
    useNotificationReportMutation();

  const handleGenerate = async () => {
    const response = await notificationReport();

    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    );
    window.open(url);
  };

  return (
    <div>
      <Box
        variant="contained"
        component="label"
        sx={{ fontSize: "11px" }}
        onClick={handleGenerate}
        disabled={isLoading}
      >
        {isLoading ? (
          <Button
            disabled
            variant="contained"
            startIcon={<CircularProgress size={20} />}
          >
            Generating Report
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<FileDownloadOutlined sx={{ fontSize: "10.8px" }} />}
            sx={{ fontSize: "10.8px", backgroundColor:theme.palette.buttons.main }}
          >
            Download PDF
          </Button>
        )}
      </Box>
    </div>
  );
};

export default GenerateNotificationReport;
