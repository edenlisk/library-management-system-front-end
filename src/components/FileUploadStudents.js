import React, { useState, useRef } from "react";
import { Box, Button, TextField, Tooltip,Stack } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { useUploadStudentsMutation } from "../states/apiSlice";

const FileUploadStudents = ({ classId }) => {
  const [uploadStudents, { isSuccess, isLoading }] =
    useUploadStudentsMutation();
  const [selectedFile, setSelectedFile] = useState(null);

  const [firstClick, setFirstClick] = useState(false);

  const [fileDialogOpened, setFileDialogOpened] = useState(false);

  const fileStudentsInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFirstClick(true);
  };
  const handleUpload = async (classId) => {
    const formData = new FormData();
    formData.append("students", selectedFile, selectedFile.name);
    await uploadStudents({ classId, formData });
    console.log(classId);
  };
  const handleFirstclick = () => {
    if (!fileDialogOpened) {
      fileStudentsInputRef.current.click();
      setFileDialogOpened(true);
      setFirstClick(true);

    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Tooltip title="Upload students" placement="top" arrow>
        <Stack
          variant="contained"
          onClick={() =>
            firstClick ? handleUpload(classId) : handleFirstclick()
          }
        >
          {isLoading ? (
            "Uploading"
          ) : (
            // TO CHANGE THE BUTTON ON FILE CHANGE
            <Button
              variant="contained"
              startIcon={<UploadFile sx={{ fontSize: "10.8px" }} />}
              sx={{ fontSize: "10.8px" }}
            >
                <input
        type="file"
        style={{ display: "none" }}
        ref={fileStudentsInputRef}
        onChange={handleFileChange}
      />
              students
            </Button>
          )}
        </Stack>
      </Tooltip>
    </Box>
  );
};

export default FileUploadStudents;
