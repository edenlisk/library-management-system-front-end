import React, { useRef ,useState} from 'react';
import { Button, Box } from '@mui/material';
import { useTheme } from 'styled-components';

const FileUploadButton = () => {
  const fileInputRef = useRef(null);
  const [firstClick, setFirstClick] = useState(false);
  const theme =useTheme();

  const handleFileChange = (event) => {
    // to choose file on file explorer modal and enable trigger of the upload function after
    const files = event.target.files;
    if (files && files.length > 0) {
      // File selected
      console.log('File selected:', files[0]);
      setFirstClick(true);
      
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
    fileInputRef.current.click();
    console.log("yoola")
  };
  const handleUpload = () => {
    console.log("upload sasa");
    fileInputRef.current.value = ''
    setFirstClick(false);
  };


  return (
    <Box>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        onClick={() =>
          firstClick ? two() : one()}
      />
      {firstClick ? <Button variant="contained"onClick={() =>handleUpload()}>
        upload File
      </Button>:<Button  variant="contained"onClick={() =>handleButtonClick()}>
        Select File
      </Button>}

      <Button
      variant="contained"
      sx={{ backgroundColor: theme.palette.primary[900] }}
    >
      Button Text
    </Button>

    </Box>
  );
};

export default FileUploadButton;