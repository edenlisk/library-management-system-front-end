import React, {useState, useRef, useEffect} from "react";
import { Box, Button, TextField, Tooltip, Stack, CircularProgress,useTheme } from "@mui/material";
import { CheckCircleOutlineOutlined, UploadFile } from "@mui/icons-material";
import { useUploadClassesMutation } from "../states/apiSlice";
import {toast} from "react-toastify";

const FileUploadClasses = ({ academicYear }) => {
  const theme=useTheme();
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
    // to choose file on file explorer modal and enable trigger of the upload function after
    const files = event.target.files;
    if (files && files.length > 0) {
      // File selected
      console.log('File selected:', files[0]);
      setFirstClick(true);
      setSelectedFile(files[0]);
    }
    else {
      // when file is not selected cancel upload function and revert back to handle buttonclick
          setFirstClick(false)
          console.log('niko');
        }
      
  };

  const one= ()=>{
    console.log("one click is all it takes")
  }
  const two= ()=>{
    console.log("two click is all it takes")
  }

  const handleButtonClick = () => {
    fileClassesInputRef.current.click();
    console.log("yoola")
  };

  const handleUpload = async (academicYear) => {
    const formData = new FormData();
    formData.append("classes", selectedFile, selectedFile.name);
    await uploadClasses({ academicYear, formData });
    setSelectedFile("");
    setFirstClick(false);
  };


  return (
    <Box sx={{ display: "flex" }}>

<input
        type="file"
        ref={fileClassesInputRef}
        style={{ display: 'none' }}
        accept=".csv, text/csv"
        onChange={handleFileChange}
        onClick={() =>
          firstClick ? two() : one()}
      />
      {firstClick ?<> {isLoading?<Button variant="contained" disabled startIcon={<CircularProgress size={20}/> }>
       uploading
      </Button>:<Button sx={{backgroundColor:"#37796c"}} variant="contained" startIcon={<CheckCircleOutlineOutlined sx={{ fontSize: "10.8px" }} />} onClick={() =>handleUpload(academicYear)}>
       upload classes
      </Button>}</>:<Button variant="contained" sx={{backgroundColor:theme.palette.buttons.main}} startIcon={<UploadFile sx={{ fontSize: "10.8px" }} />} onClick={() =>handleButtonClick()}>
        classes
      </Button>}
    </Box>
  );
};

export default FileUploadClasses;
