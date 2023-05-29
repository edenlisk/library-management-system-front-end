import {useUploadBooksMutation} from "../../states/apiSlice";
import React, {useRef, useState} from "react";
import {Box, Button, Stack, Tooltip} from "@mui/material";
import {UploadFile} from "@mui/icons-material";


const FileUploadBooks = () => {
    const [uploadBooks, { isSuccess, isLoading }] = useUploadBooksMutation();
    const [selectedFile, setSelectedFile] = useState(null);

    const [firstClick, setFirstClick] = useState(false);

    const [fileDialogOpened, setFileDialogOpened] = useState(false);

    const fileBooksInputRef = useRef(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setFirstClick(true);
    };
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("books", selectedFile, selectedFile.name);
        await uploadBooks({ formData });
    };
    const handleFirstclick = () => {
        if (!fileDialogOpened) {
            fileBooksInputRef.current.click();
            setFileDialogOpened(true);
            setFirstClick(true);
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Tooltip title="Upload books" placement="top" arrow>
                <Stack
                    variant="contained"
                    onClick={() =>
                        firstClick ? handleUpload() : handleFirstclick()
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
                                ref={fileBooksInputRef}
                                onChange={handleFileChange}
                            />
                            books
                        </Button>
                    )}
                </Stack>
            </Tooltip>
        </Box>
    );
}

export default FileUploadBooks;