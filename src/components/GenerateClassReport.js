import React, { useState } from "react";
import { useGenerateClassReportMutation } from "../states/apiSlice";
import { FileDownloadOutlined } from "@mui/icons-material";
import { Box, Button, CircularProgress,useTheme } from "@mui/material";

const GenerateClassReport = ({ ClassId }) => {
  const theme =useTheme();
  const [generateClassReport, { data, isLoading }] =
    useGenerateClassReportMutation();

  const handleGenerate = async () => {
    const response = await generateClassReport(ClassId);

    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    );
    window.open(url);
  };

  return (
    <div>
      <Box
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

export default GenerateClassReport;
