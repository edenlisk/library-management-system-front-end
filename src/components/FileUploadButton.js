import React, { useRef ,useState} from 'react';
import { Button, Box } from '@mui/material';

const FileUploadButton = () => {
  const fileInputRef = useRef(null);
  const [firstClick, setFirstClick] = useState(false);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // File selected
      console.log('File selected:', files[0]);
      
    }
    else {
        // File selection canceled or no file selected
        const isFileSelected = event.target.value !== '';
        setFirstClick(true);
        if (!isFileSelected) {
          console.log('niko');
        }
      }
  };

  


  const handleButtonClick = () => {
    fileInputRef.current.click();
    console.log("yoola")
  };

  return (
    <Box>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button variant="contained" onClick={handleButtonClick}>
        Select File
      </Button>
    </Box>
  );
};

export default FileUploadButton;