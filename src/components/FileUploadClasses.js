import React, {useState, useRef, useEffect} from "react";
import { Box, Button, TextField, Tooltip, Stack  } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { useUploadClassesMutation } from "../states/apiSlice";
import {toast} from "react-toastify";

const FileUploadClasses = ({ academicYear }) => {
  const [uploadClasses, { isSuccess, isLoading, isError, error }] = useUploadClassesMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Classes uploaded successfully")
    } else if (isError) {
      const { data:fullError } = error;
      const {message} = fullError;
      toast.error(message);
    }
  }, [isError, isSuccess]);


  const [selectedFile, setSelectedFile] = useState(null);

  const [firstClick, setFirstClick] = useState(false);

  const [fileDialogOpened, setFileDialogOpened] = useState(false);

  const fileClassesInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFirstClick(true);
  };
  const handleUpload = async (academicYear) => {
    const formData = new FormData();
    formData.append("students", selectedFile, selectedFile.name);
    await uploadClasses({ academicYear, formData });
  };

  const handleFirstclick = () => {
    if (!fileDialogOpened) {
      fileClassesInputRef.current.click();
      setFileDialogOpened(true);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <TextField
        type="file"
        sx={{ display: "none" }}
        ref={fileClassesInputRef}
        onChange={handleFileChange}
      />
      <Tooltip title="Upload classes" placement="top" arrow>
        <Stack
          variant="contained"
          onClick={() =>
            firstClick ? handleUpload(`${academicYear}`) : handleFirstclick()
          }
        >
          {isLoading ? (
            "Uploading"
          ) : (
            <Button
              variant="contained"
              startIcon={<UploadFile sx={{ fontSize: "10.8px" }} />}
              sx={{ fontSize: "10.8px" }}
            >
              classes
            </Button>
          )}
        </Stack>
      </Tooltip>
    </Box>
  );
};

export default FileUploadClasses;
