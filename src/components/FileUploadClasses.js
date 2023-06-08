import React, {useState, useRef, useEffect} from "react";
import { Box, Button, TextField, Tooltip, Stack, CircularProgress  } from "@mui/material";
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
    formData.append("classes", selectedFile, selectedFile.name);
    await uploadClasses({ academicYear, formData });
    console.log(academicYear);
  };

  const handleFirstclick = () => {
    if (!fileDialogOpened) {
      fileClassesInputRef.current.click();
      setFileDialogOpened(true);
      
     
    }
  };

  return (
    <Box sx={{ display: "flex" }}>

      <Tooltip title="Upload classes" placement="top" arrow>
        <Stack
          variant="contained"
          onClick={() =>
            firstClick ? handleUpload(academicYear) : handleFirstclick()
          }
        >
          {isLoading ? (
           <Button disabled
           variant="contained"
           startIcon={ <CircularProgress size={20}/> }
           >Uploading</Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<UploadFile sx={{ fontSize: "10.8px" }} />}
              sx={{ fontSize: "10.8px" }}
            >
                    <input
        type="file"
        style={{ display: "none" }}
        ref={fileClassesInputRef}
        onChange={handleFileChange}
      />
              classes
            </Button>
          )}
        </Stack>
      </Tooltip>
    </Box>
  );
};

export default FileUploadClasses;
