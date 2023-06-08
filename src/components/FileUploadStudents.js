import React, {useState, useRef, useEffect} from "react";
import {Box, Button, TextField, Tooltip, Stack, CircularProgress } from "@mui/material";
import { CheckCircleOutlineOutlined, UploadFile } from "@mui/icons-material";
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
  const [selectedFile, setSelectedFile] = useState("");

  const [firstClick, setFirstClick] = useState(false);


  const fileStudentsInputRef = useRef(null);

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
    fileStudentsInputRef.current.click();
    console.log("yoola")
  };

  const handleUpload = async (classId) => {
    const formData = new FormData();
    formData.append("students", selectedFile, selectedFile.name);
    await uploadStudents({ classId, formData });
    setSelectedFile("");
    setFirstClick(false);
  };


  return (
    <Box sx={{ display: "flex" }}>
      
      <input
        type="file"
        ref={fileStudentsInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        onClick={() =>
          firstClick ? two() : one()}
      />
      {firstClick ?<> {isLoading?<Button variant="contained" disabled startIcon={<CircularProgress size={20}/> }>
       uploading
      </Button>:<Button sx={{backgroundColor:"#37796c"}} variant="contained" startIcon={<CheckCircleOutlineOutlined sx={{ fontSize: "10.8px" }} />} onClick={() =>handleUpload(classId)}>
       upload students
      </Button>}</>:<Button variant="contained"  startIcon={<UploadFile sx={{ fontSize: "10.8px" }} />} onClick={() =>handleButtonClick()}>
        students
      </Button>}
     
    </Box>
  );
};


export default FileUploadStudents;
