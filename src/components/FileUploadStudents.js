import React, { useState } from 'react';
import {Box, Button, TextField} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { useUploadStudentsMutation } from '../states/apiSlice';


const FileUploadStudents = () => {
    const [ uploadStudents, {isSuccess, isLoading} ] = useUploadStudentsMutation();
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }
    const handleUpload = async (classId) => {
        const formData = new FormData();
        formData.append('students', selectedFile, selectedFile.name);
        await uploadStudents({classId, formData});
    }

    return (
        <Box sx={{display: 'flex'}}>
            <TextField
                type="file"
                onChange={handleFileChange}
            />
            <Button variant="contained" onClick={() => handleUpload('')}>
                {isLoading ? 'Uploading' : <UploadFile/>}
            </Button>
        </Box>
    )
}

export default FileUploadStudents;
