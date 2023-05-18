import React, { useState } from 'react';
import {Box, Button, TextField} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { useUploadClassesMutation } from '../states/apiSlice';


const FileUploadClasses = () => {
    const [ uploadClasses, {isSuccess, isLoading} ] = useUploadClassesMutation();
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }
    const handleUpload = async (academicYear) => {
        const formData = new FormData();
        formData.append('students', selectedFile, selectedFile.name);
        await uploadClasses({academicYear, formData});
    }

    return (
        <Box sx={{display: 'flex'}}>
            <TextField
                type="file"
                onChange={handleFileChange}
            />
            <Button variant="contained" onClick={handleUpload('')}>
                {isLoading ? 'Uploading' : (<UploadFile/>)}
            </Button>
        </Box>
    )
}

export default FileUploadClasses;
