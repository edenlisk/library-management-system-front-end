import React, { useRef,useState } from 'react';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const CustomButtuonUpload = () => {

  const [fileDialogOpened, setFileDialogOpened] = useState(false);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (!fileDialogOpened) {
    fileInputRef.current.click();
    setFileDialogOpened(true);
  }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Process the selected file
    console.log(file);
  };

  return (
    <div>
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        onClick={handleButtonClick}
      >
        Select File
        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </Button>
    </div>
  );
};

export default CustomButtuonUpload;