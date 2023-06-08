import React, {useState, useRef, useEffect} from "react";
import {Box, Button, TextField, Tooltip, Stack, CircularProgress } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { useUploadStudentsMutation } from "../states/apiSlice";
import {toast} from "react-toastify";

const FileUploadStudents = ({ classId }) => {
  const [uploadStudents, { isSuccess, isLoading, isError, error }] = useUploadStudentsMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Students uploaded successfully");
    } else if (isError) {
      const { data:fullError } = error;
      const {message} = fullError;
      toast.error(message);
    }
  }, [isError, isSuccess]);
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
            <Button disabled
            variant="contained"
            startIcon={ <CircularProgress size={20}/> }
            >Uploading</Button>
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
