import {useUploadBooksMutation} from "../../states/apiSlice";
import React, {useEffect, useRef, useState} from "react";
import {Box, Button,CircularProgress,useTheme} from "@mui/material";
import {UploadFile,CheckCircleOutlineOutlined} from "@mui/icons-material";
import {toast} from "react-toastify";


const FileUploadBooks = () => {
    const theme= useTheme();
    const [uploadBooks, { isSuccess, isLoading, isError, error }] = useUploadBooksMutation();
    useEffect(() => {
        if (isSuccess) {
            toast.success("Books uploaded successfully")
        } else if (isError) {
            const { data:fullError } = error;
            const {message} = fullError;
            toast.error(message);
        }
    }, [isError, isSuccess]);
    const [selectedFile, setSelectedFile] = useState(null);

    const [firstClick, setFirstClick] = useState(false);

    const [fileDialogOpened, setFileDialogOpened] = useState(false);

    const fileBooksInputRef = useRef(null);

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
        fileBooksInputRef.current.click();
        console.log("yoola")
      };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("books", selectedFile, selectedFile.name);
        await uploadBooks({ formData });
        setSelectedFile("");
        setFirstClick(false);
    };

    return (
        <Box sx={{ display: "flex" }}>
      
        <input
          type="file"
          ref={fileBooksInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          onClick={() =>
            firstClick ? two() : one()}
        />
        {firstClick ?<> {isLoading?<Button variant="contained" disabled startIcon={<CircularProgress size={20}/> }>
         uploading
        </Button>:<Button sx={{backgroundColor:"#37796c"}} variant="contained" startIcon={<CheckCircleOutlineOutlined sx={{ fontSize: "10.8px" }} />} onClick={() =>handleUpload()}>
         upload Books
        </Button>}</>:<Button variant="contained" sx={{backgroundColor:theme.palette.buttons.main}} startIcon={<UploadFile sx={{ fontSize: "10.8px" }} />} onClick={() =>handleButtonClick()}>
          books
        </Button>}
       
      </Box>
    );
}

export default FileUploadBooks;