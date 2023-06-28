import React, { useState } from "react";
import { useGenerateStudentReportMutation } from "../states/apiSlice";
import { FileDownloadOutlined } from "@mui/icons-material";
import { Box, Button, CircularProgress,useTheme } from "@mui/material";

const GenerateStudentReport = ({ studentId }) => {
  const theme=useTheme();
  const [generateStudentReport, { data, isLoading }] =
    useGenerateStudentReportMutation();

  const handleGenerate = async () => {
    const response = await generateStudentReport(`${studentId}`);

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
            download
          </Button>
        )}
      </Box>
    </div>
  );
};

export default GenerateStudentReport;
