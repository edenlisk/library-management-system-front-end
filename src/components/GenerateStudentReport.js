import React, { useState } from "react";
import { useGenerateStudentReportMutation } from "../states/apiSlice";
import Button from "@mui/material/Button";
import { FileDownloadOutlined } from "@mui/icons-material";
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
      <span
        onClick={handleGenerate}
        disabled={isLoading}
      >
        {isLoading ? (
          "Generating Report..."
        ) : (
          <Button
            variant="contained"
            startIcon={<FileDownloadOutlined sx={{ fontSize: "10.8px" }} />}
            sx={{ fontSize: "10.8px" }}
          >
            download
          </Button>
        )}
      </span>
    </div>
  );
};

export default GenerateStudentReport;
