import React, { useState } from "react";
import { useGenerateStudentReportMutation } from "../states/apiSlice";
import Button from "@mui/material/Button";
import { FileDownloadOutlined } from "@mui/icons-material";
import {Box} from "@mui/material";
const GenerateStudentReport = ({ studentId }) => {
  const [generateStudentReport, { data }] = useGenerateStudentReportMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    const response = await generateStudentReport(`${studentId}`);

    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    );
    window.open(url);

    setIsLoading(false);
  };

  return (
    <div>
      <Box
          variant="contained"
          component="label"
          sx={{fontSize: "11px"}}
          onClick={handleGenerate}
          disabled={isLoading}
      >
        {isLoading ? (
            <Button disabled>Generating Report ...</Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<FileDownloadOutlined sx={{ fontSize: "10.8px" }} />}
            sx={{ fontSize: "10.8px" }}
          >
            download
          </Button>
        )}
      </Box>
    </div>
  );
};

export default GenerateStudentReport;
